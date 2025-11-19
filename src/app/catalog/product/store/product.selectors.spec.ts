/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */
import { ProductTestData } from '@models/product.testdata';
import { selectCurrentProductDetails, selectProducts } from './product.selectors';
import { productFeatureKey } from './product.reducer';
import { AppState, catalogFeatureKey } from '@app/reducers';

describe('Product Selectors', () => {
  describe('selectProducts', () => {
    it('should select the products', () => {
      const state = {
        [productFeatureKey]: {
          products: ProductTestData.validProductList,
          currentProductDetails: null,
        },
      } as Partial<AppState> as AppState;

      expect(selectProducts(state)).toEqual(ProductTestData.validProductList);
    });
  });

  describe('selectProductDetails', () => {
    it('should select the current product details', () => {
      const state = {
        [productFeatureKey]: {
          products: ProductTestData.validProductList,
          currentProductDetails: ProductTestData.validProduct,
        },
      } as Partial<AppState> as AppState;

      expect(selectCurrentProductDetails(state)).toEqual(ProductTestData.validProduct);
    });
  });
});
