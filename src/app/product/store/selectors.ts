import { Product } from '@models/product';
import { RootState } from '@store/root.reducer';

export function getProducts(rootState: RootState): Product[] {
  return rootState.product.products;
}

export function getCurrentProductDetail(rootState: RootState): Product {
  return rootState.product.currentProductDetails;
}
