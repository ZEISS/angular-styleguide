import { ProductInCart } from '@models/product';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

interface ShoppingCartState {
  products: ProductInCart[];
  isLoading: boolean;
  filter: { query: string; order: 'asc' | 'desc' };
}

const initialState: ShoppingCartState = {
  products: [],
  isLoading: false,
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
      const productAlreadyInCart = this.products()?.find(
        (productToAdd: ProductInCart) => product.id === productToAdd.id,
      );

      if (productAlreadyInCart) {
        const productWithoutTheUpdatedProduct = this.products().filter(
          (product: ProductInCart) => product.id !== productAlreadyInCart.id,
        );
        productAlreadyInCart.count += product.count;
        const updatedProducts = [...productWithoutTheUpdatedProduct, productAlreadyInCart];
        patchState(store, { products: updatedProducts });
        return;
      }

      const updatedProducts = [...store.products(), product];
      patchState(store, { products: updatedProducts });
    },
    updateCount(productId: number, newCount: number) {
      const productWithoutTheUpdatedProduct = this.products().filter(
        (product: ProductInCart) => product.id !== productId,
      );
      const updatableProduct = this.products()?.find(
        (product: ProductInCart) => product.id === productId,
      );

      if (updatableProduct.count > 1) {
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
      const productWithoutTheUpdatedProduct = this.products().filter(
        (product: ProductInCart) => product.id !== productId,
      );

      if (!productWithoutTheUpdatedProduct) {
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
