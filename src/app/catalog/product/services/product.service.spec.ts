/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product.service';
import { ProductTestData } from '@models/product.testdata';
import { provideHttpClient } from '@angular/common/http';

const productsUrl = './assets/products.json';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [ProductService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadProducts', () => {
    it('should retrieve products from api', (done) => {
      service.loadProducts().subscribe((products) => {
        expect(products).toEqual(ProductTestData.validProductList);
        done();
      });

      httpMock
        .expectOne({ url: productsUrl, method: 'GET' })
        .flush(ProductTestData.validProductList);
      httpMock.verify();
    });
  });

  describe('getProduct', () => {
    it('should retrieve products from api and filter product by id', (done) => {
      service.getProduct(ProductTestData.validProduct.id).subscribe((products) => {
        expect(products).toEqual(ProductTestData.validProduct);
        done();
      });

      httpMock
        .expectOne({ url: productsUrl, method: 'GET' })
        .flush(ProductTestData.validProductList);
      httpMock.verify();
    });
  });
});
