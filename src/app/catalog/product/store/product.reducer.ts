/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { createFeature, createReducer, on } from '@ngrx/store';
import { Product } from '@models/product';
import { Nullable } from '@app/shared/global.types';
import { loadProductDetailsSuccess, loadProductsSuccess } from './product.actions';

export const productFeatureKey = 'product';

export interface ProductState {
  products: Product[];
  currentProductDetails: Nullable<Product>;
}

export const initialState: ProductState = {
  products: [],
  currentProductDetails: null,
};

export const ProductReducer = createFeature({
  name: productFeatureKey,
  reducer: createReducer(
    initialState,
    on(loadProductsSuccess, (state, { products }) => ({ ...state, products })),
    on(loadProductDetailsSuccess, (state, { product }) => ({
      ...state,
      currentProductDetails: product,
    })),
  ),
});
