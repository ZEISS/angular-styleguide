import {RootState} from '@store/root.reducer';
import {Product} from '@models/product';

export function getProducts(rootState: RootState): Product[] {
  return rootState.product.products;
}
