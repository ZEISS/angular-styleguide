import { getProducts } from '@app/product/store/selectors';
import { ProductState } from '@app/product/store/reducers';
import { Product } from '@models/product';
import { RootState } from '@store/root.reducer';

describe('ProductSelectors', () => {

  const mocks = {
    get products(): Product[] {
      return [{
        id: 1,
        title: 'test',
        image: 'none',
        price: '1.99€',
        description: 'empty',
      }];
    }
  };

  fit('should return products on getProducts call', () => {
    // preparations
    const state: RootState = {
      product: {
        products: mocks.products,
      }
    } as RootState;

    // executions
    const products = getProducts(state);

    // verification
    expect(products).toEqual(mocks.products);
  });
});
