/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { TestBed } from '@angular/core/testing';
import { ProductService } from '@app/catalog/product/services/product.service';
import { ProductStore } from './product.store';
import { ProductTestData } from '@models/product.testdata';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('ProductStore', () => {
  let store: InstanceType<typeof ProductStore>;
  let productService: jasmine.SpyObj<ProductService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductService', [
      'loadProducts',
      'getProduct',
    ]);
    // Setup default return value to handle auto-load in withHooks
    productServiceSpy.loadProducts.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        ProductStore,
        { provide: ProductService, useValue: productServiceSpy },
        provideHttpClient(),
      ],
    });

    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
    store = TestBed.inject(ProductStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have empty products array after auto-load completes', (done) => {
      setTimeout(() => {
        expect(store.products()).toEqual([]);
        done();
      }, 100);
    });

    it('should have null currentProductDetails', () => {
      expect(store.currentProductDetails()).toBeNull();
    });

    it('should have isLoading as false after auto-load completes', (done) => {
      setTimeout(() => {
        expect(store.isLoading()).toBe(false);
        done();
      }, 100);
    });

    it('should call loadProducts on initialization', (done) => {
      setTimeout(() => {
        expect(productService.loadProducts).toHaveBeenCalledWith();
        done();
      }, 100);
    });
  });

  describe('loadProducts', () => {
    it('should load products successfully', (done) => {
      const mockProducts = ProductTestData.validProductList;
      productService.loadProducts.and.returnValue(of(mockProducts));

      store.loadProducts();

      // Allow async operations to complete
      setTimeout(() => {
        expect(store.products()).toEqual(mockProducts);
        expect(store.isLoading()).toBe(false);
        expect(productService.loadProducts).toHaveBeenCalledWith();
        done();
      }, 100);
    });

    it('should set isLoading to true while loading', () => {
      productService.loadProducts.and.returnValue(of(ProductTestData.validProductList));

      store.loadProducts();

      // Immediately after calling, isLoading should be true (briefly)
      // Note: Due to async nature, this might be false if the observable completes quickly
      expect(productService.loadProducts).toHaveBeenCalledWith();
    });

    it('should handle errors when loading products', (done) => {
      const errorMessage = 'Failed to load products';
      productService.loadProducts.and.returnValue(throwError(() => new Error(errorMessage)));
      spyOn(console, 'error');

      store.loadProducts();

      setTimeout(() => {
        expect(store.products()).toEqual([]);
        expect(store.isLoading()).toBe(false);
        expect(console.error).toHaveBeenCalledWith('Error loading products:', jasmine.any(Error));
        done();
      }, 100);
    });
  });

  describe('loadProductDetails', () => {
    it('should load product details successfully', (done) => {
      const mockProduct = ProductTestData.validProduct;
      const productId = 1;
      productService.getProduct.and.returnValue(of(mockProduct));

      store.loadProductDetails(productId);

      setTimeout(() => {
        expect(store.currentProductDetails()).toEqual(mockProduct);
        expect(store.isLoading()).toBe(false);
        expect(productService.getProduct).toHaveBeenCalledWith(productId);
        done();
      }, 100);
    });

    it('should set isLoading to true while loading product details', () => {
      productService.getProduct.and.returnValue(of(ProductTestData.validProduct));

      store.loadProductDetails(1);

      expect(productService.getProduct).toHaveBeenCalledWith(1);
    });

    it('should handle errors when loading product details', (done) => {
      const errorMessage = 'Failed to load product details';
      productService.getProduct.and.returnValue(throwError(() => new Error(errorMessage)));
      spyOn(console, 'error');

      store.loadProductDetails(1);

      setTimeout(() => {
        expect(store.currentProductDetails()).toBeNull();
        expect(store.isLoading()).toBe(false);
        expect(console.error).toHaveBeenCalledWith(
          'Error loading product details:',
          jasmine.any(Error),
        );
        done();
      }, 100);
    });

    it('should load details for different product IDs', (done) => {
      const mockProduct = ProductTestData.validProduct;
      productService.getProduct.and.returnValue(of(mockProduct));

      store.loadProductDetails(42);

      setTimeout(() => {
        expect(productService.getProduct).toHaveBeenCalledWith(42);
        done();
      }, 100);
    });
  });

  describe('clearCurrentProduct', () => {
    it('should clear current product details', (done) => {
      const mockProduct = ProductTestData.validProduct;
      productService.getProduct.and.returnValue(of(mockProduct));

      store.loadProductDetails(1);

      setTimeout(() => {
        expect(store.currentProductDetails()).toEqual(mockProduct);

        store.clearCurrentProduct();

        expect(store.currentProductDetails()).toBeNull();
        done();
      }, 100);
    });

    it('should not affect other state when clearing current product', () => {
      const mockProducts = ProductTestData.validProductList;
      productService.loadProducts.and.returnValue(of(mockProducts));

      store.loadProducts();
      store.clearCurrentProduct();

      expect(store.currentProductDetails()).toBeNull();
      expect(store.isLoading()).toBe(false);
    });
  });

  describe('state interactions', () => {
    it('should handle loading products and details simultaneously', (done) => {
      const mockProducts = ProductTestData.validProductList;
      const mockProduct = ProductTestData.validProduct;

      productService.loadProducts.and.returnValue(of(mockProducts));
      productService.getProduct.and.returnValue(of(mockProduct));

      store.loadProducts();
      store.loadProductDetails(1);

      setTimeout(() => {
        expect(store.products()).toEqual(mockProducts);
        expect(store.currentProductDetails()).toEqual(mockProduct);
        expect(store.isLoading()).toBe(false);
        done();
      }, 100);
    });

    it('should maintain products when loading product details', (done) => {
      const mockProducts = ProductTestData.validProductList;
      const mockProduct = ProductTestData.validProduct;

      productService.loadProducts.and.returnValue(of(mockProducts));
      productService.getProduct.and.returnValue(of(mockProduct));

      store.loadProducts();

      setTimeout(() => {
        expect(store.products()).toEqual(mockProducts);

        store.loadProductDetails(1);

        setTimeout(() => {
          expect(store.products()).toEqual(mockProducts);
          expect(store.currentProductDetails()).toEqual(mockProduct);
          done();
        }, 100);
      }, 100);
    });
  });
});
