/*
 * SPDX-FileCopyrightText: (c) $originalComment.match("Copyright \(c\) (\d+)", 1, "-", "$today.year")2024 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ProductInCart } from '@models/product-in-cart';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface ShoppingCartState {
  products: ProductInCart[];
  filter: { query: string; order: 'asc' | 'desc' };
}

const initialState: ShoppingCartState = {
  products: [],
  filter: { query: '', order: 'asc' },
};
/**
 * NgRx Signal store implementation for storing collected items
 * read more: https://ngrx.io/guide/signals/signal-store
 */
export const ShoppingCartStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    addProduct(product: ProductInCart) {
      const productAlreadyInCart = store
        .products()
        ?.find((productToAdd: ProductInCart) => product.id === productToAdd.id);

      if (productAlreadyInCart) {
        const productWithoutTheUpdatedProduct: ProductInCart[] = store
          .products()
          .filter((product: ProductInCart) => product.id !== productAlreadyInCart.id);
        productAlreadyInCart.count += product.count;
        const updatedProducts = [...productWithoutTheUpdatedProduct, productAlreadyInCart];
        patchState(store, { products: updatedProducts });
        return;
      }

      const updatedProducts: ProductInCart[] = [...store.products(), product];
      patchState(store, { products: updatedProducts });
    },
    updateCount(productId: number, newCount: number) {
      const productWithoutTheUpdatedProduct = store
        .products()
        .filter((product: ProductInCart) => product.id !== productId);
      const updatableProduct = store
        .products()
        .find((product: ProductInCart) => product.id === productId);

      if (updatableProduct && updatableProduct.count > 1) {
        updatableProduct.count = newCount;
        const updatedProducts = [...productWithoutTheUpdatedProduct, updatableProduct];
        patchState(store, { products: updatedProducts });
        return;
      }

      // deleting
      const updatedProducts = [...productWithoutTheUpdatedProduct];
      patchState(store, { products: updatedProducts });
    },
    deleteProduct(productId: number) {
      const productWithoutTheUpdatedProduct = store
        .products()
        .filter((product: ProductInCart) => product.id !== productId);

      if (productWithoutTheUpdatedProduct.length === 0) {
        console.error('Error while deleting product from ShoppingCartStore: Product is not found');
        return;
      }

      const updatedProducts = [...productWithoutTheUpdatedProduct];
      patchState(store, { products: updatedProducts });
    },
    deleteCartContent() {
      patchState(store, { products: [] });
    },
  })),
);
