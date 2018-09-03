import {RootState} from '../../../support/store/root.reducer';
import {Product} from '../../../model/product';

export function getProducts(rootState: RootState): Product[] {
  return rootState.product.products;
}
