/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { catalogFeatureKey, StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { ProductTestData } from '@models/product.testdata';
import { selectCurrentProductDetails, selectProducts } from './product.selectors';
import { productFeatureKey } from './product.reducer';

describe('Product Selectors', () => {
  describe('selectProducts', () => {
    it('should select the products', () => {
      const state = {
        [catalogFeatureKey]: {
          [productFeatureKey]: {
            products: ProductTestData.validProductList,
            currentProductDetails: undefined,
          },
        },
      } as StateWithCatalog;

      expect(selectProducts(state)).toEqual(ProductTestData.validProductList);
    });
  });

  describe('selectProductDetails', () => {
    it('should select the current product details', () => {
      const state = {
        [catalogFeatureKey]: {
          [productFeatureKey]: {
            products: ProductTestData.validProductList,
            currentProductDetails: ProductTestData.validProduct,
          },
        },
      } as StateWithCatalog;

      expect(selectCurrentProductDetails(state)).toEqual(ProductTestData.validProduct);
    });
  });
});
