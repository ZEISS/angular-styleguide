/*
 * SPDX-FileCopyrightText: (c) 2024 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { TestBed } from '@angular/core/testing';
import { ShoppingCartStore } from './shopping-cart.store';
import { ProductInCart } from '@models/product-in-cart';

describe('ShoppingCartStore', () => {
  let store: InstanceType<typeof ShoppingCartStore>;

  const createMockProduct = (id: number, count: number = 1): ProductInCart => ({
    id,
    title: `Product ${id}`,
    price: 10.0,
    description: 'Test product',
    image: 'test.jpg',
    count,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShoppingCartStore],
    });

    store = TestBed.inject(ShoppingCartStore);
  });

  describe('initial state', () => {
    it('should have empty products array', () => {
      expect(store.products()).toEqual([]);
    });

    it('should have default filter with empty query and asc order', () => {
      expect(store.filter()).toEqual({ query: '', order: 'asc' });
    });
  });

  describe('addProduct', () => {
    it('should add a new product to empty cart', () => {
      const product = createMockProduct(1);
      store.addProduct(product);

      expect(store.products()).toEqual([product]);
    });

    it('should add multiple different products', () => {
      const product1 = createMockProduct(1);
      const product2 = createMockProduct(2);

      store.addProduct(product1);
      store.addProduct(product2);

      expect(store.products().length).toBe(2);
      expect(store.products()).toContain(product1);
      expect(store.products()).toContain(product2);
    });

    it('should increase count when adding existing product', () => {
      const product1 = createMockProduct(1, 2);
      const product2 = createMockProduct(1, 3);

      store.addProduct(product1);
      store.addProduct(product2);

      expect(store.products().length).toBe(1);
      expect(store.products()[0].count).toBe(5); // 2 + 3
    });

    it('should maintain other products when adding to existing product', () => {
      const product1 = createMockProduct(1, 1);
      const product2 = createMockProduct(2, 1);
      const product3 = createMockProduct(1, 2);

      store.addProduct(product1);
      store.addProduct(product2);
      store.addProduct(product3);

      expect(store.products().length).toBe(2);
      const updatedProduct1 = store.products().find((p) => p.id === 1);

      expect(updatedProduct1?.count).toBe(3); // 1 + 2
    });
  });

  describe('updateCount', () => {
    beforeEach(() => {
      const product = createMockProduct(1, 5);
      store.addProduct(product);
    });

    it('should update count for existing product', () => {
      store.updateCount(1, 10);

      const product = store.products().find((p) => p.id === 1);

      expect(product?.count).toBe(10);
    });

    it('should remove product when count is 1 or less and updateCount is called', () => {
      // When product count is 1 (not > 1), updateCount removes the product
      store.updateCount(1, 1); // Set to 1 first

      const productBefore = store.products().find((p) => p.id === 1);

      expect(productBefore?.count).toBe(1);

      // Now update again - since count is 1 (not > 1), it will be removed
      store.updateCount(1, 10);

      expect(store.products()).toEqual([]);
    });

    it('should remove product when updating to 1 from count of 1', () => {
      // Reset to count of 1
      store.updateCount(1, 1);

      expect(store.products().length).toBe(1);

      // Add another product
      store.addProduct(createMockProduct(2, 2));

      expect(store.products().length).toBe(2);

      // Update product 2 count from 2 to some value should work
      store.updateCount(2, 5);

      expect(store.products().find((p) => p.id === 2)?.count).toBe(5);
    });

    it('should not affect other products when updating', () => {
      const product2 = createMockProduct(2, 3);
      store.addProduct(product2);

      store.updateCount(1, 8);

      expect(store.products().length).toBe(2);
      expect(store.products().find((p) => p.id === 1)?.count).toBe(8);
      expect(store.products().find((p) => p.id === 2)?.count).toBe(3);
    });

    it('should handle updating non-existent product', () => {
      const initialProducts = store.products();
      store.updateCount(999, 5);

      expect(store.products()).toEqual(initialProducts);
    });
  });

  describe('deleteProduct', () => {
    beforeEach(() => {
      store.addProduct(createMockProduct(1, 2));
      store.addProduct(createMockProduct(2, 3));
      store.addProduct(createMockProduct(3, 1));
    });

    it('should delete product by id', () => {
      store.deleteProduct(2);

      expect(store.products().length).toBe(2);
      expect(store.products().find((p) => p.id === 2)).toBeUndefined();
    });

    it('should not affect other products when deleting', () => {
      store.deleteProduct(2);

      expect(store.products().find((p) => p.id === 1)?.count).toBe(2);
      expect(store.products().find((p) => p.id === 3)?.count).toBe(1);
    });

    it('should log error when trying to delete the last product', () => {
      store.deleteProduct(1);
      store.deleteProduct(2);

      expect(store.products().length).toBe(1);

      spyOn(console, 'error');
      store.deleteProduct(3);

      // After filtering out product 3, the array is empty, so error is logged and nothing changes
      expect(store.products().length).toBe(1);
      expect(console.error).toHaveBeenCalledWith(
        'Error while deleting product from ShoppingCartStore: Product is not found',
      );
    });

    it('should log error when trying to delete from empty cart', () => {
      store.deleteCartContent();
      spyOn(console, 'error');

      store.deleteProduct(1);

      expect(console.error).toHaveBeenCalledWith(
        'Error while deleting product from ShoppingCartStore: Product is not found',
      );
    });

    it('should not log error when deleting non-existent product if others remain', () => {
      spyOn(console, 'error');

      store.deleteProduct(999);

      // Filtering out non-existent product 999 leaves 3 products, so no error
      expect(store.products().length).toBe(3);
      expect(console.error).not.toHaveBeenCalled();
    });
  });

  describe('deleteCartContent', () => {
    it('should clear all products from cart', () => {
      store.addProduct(createMockProduct(1, 2));
      store.addProduct(createMockProduct(2, 3));
      store.addProduct(createMockProduct(3, 1));

      expect(store.products().length).toBe(3);

      store.deleteCartContent();

      expect(store.products()).toEqual([]);
    });

    it('should work on empty cart without error', () => {
      expect(() => store.deleteCartContent()).not.toThrow();
      expect(store.products()).toEqual([]);
    });
  });

  describe('complex scenarios', () => {
    it('should handle add, update, and delete operations in sequence', () => {
      // Add products
      store.addProduct(createMockProduct(1, 2));
      store.addProduct(createMockProduct(2, 1));
      store.addProduct(createMockProduct(3, 5));

      expect(store.products().length).toBe(3);

      // Update count
      store.updateCount(1, 10);

      expect(store.products().find((p) => p.id === 1)?.count).toBe(10);

      // Delete one
      store.deleteProduct(2);

      expect(store.products().length).toBe(2);

      // Add existing product
      store.addProduct(createMockProduct(3, 3));

      expect(store.products().find((p) => p.id === 3)?.count).toBe(8); // 5 + 3

      // Clear all
      store.deleteCartContent();

      expect(store.products()).toEqual([]);
    });

    it('should maintain product properties except count when updating', () => {
      const product = createMockProduct(1, 5); // Start with count > 1
      product.description = 'Special description';
      product.image = 'special.jpg';

      store.addProduct(product);
      store.updateCount(1, 10); // Update to 10

      const updatedProduct = store.products().find((p) => p.id === 1);

      expect(updatedProduct?.description).toBe('Special description');
      expect(updatedProduct?.image).toBe('special.jpg');
      expect(updatedProduct?.count).toBe(10);
    });
  });
});
