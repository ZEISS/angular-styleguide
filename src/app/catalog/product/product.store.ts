/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { inject } from '@angular/core';
import { ProductService } from '@app/catalog/product/services/product.service';
import { Nullable } from '@app/shared/global.types';
import { Product } from '@models/product';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { tapResponse } from '@ngrx/operators';
import { pipe, switchMap, tap } from 'rxjs';

interface ProductState {
  products: Product[];
  currentProductDetails: Nullable<Product>;
  isLoading: boolean;
}

const initialState: ProductState = {
  products: [],
  currentProductDetails: null,
  isLoading: false,
};

/**
 * NgRx Signal store implementation for product management
 * Handles product list and product details loading
 * read more: https://ngrx.io/guide/signals/signal-store
 */
export const ProductStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, productService = inject(ProductService)) => ({
    loadProducts: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          productService.loadProducts().pipe(
            tapResponse({
              next: (products) => patchState(store, { products }),
              error: (error) => console.error('Error loading products:', error),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    loadProductDetails: rxMethod<number>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((productId) =>
          productService.getProduct(productId).pipe(
            tapResponse({
              next: (product) => patchState(store, { currentProductDetails: product }),
              error: (error) => console.error('Error loading product details:', error),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    clearCurrentProduct() {
      patchState(store, { currentProductDetails: null });
    },
  })),
  withHooks({
    onInit(store) {
      // Auto-load products when store initializes
      store.loadProducts();
    },
  }),
);
