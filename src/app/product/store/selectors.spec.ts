import { getProducts } from '@app/product/store/selectors';
import { ProductState } from '@app/product/store/reducers';
import { Product } from '@models/product';
import { RootState } from '@store/root.reducer';
import { ProductTestData } from '@models/product.testdata';

describe('ProductSelectors', () => {

  it('should return products on getProducts call', () => {
    // preparations
    const state: RootState = {
      product: {
        products: ProductTestData.validProductList,
      }
    } as RootState;

    // executions
    const products = getProducts(state);

    // verification
    expect(products).toEqual(ProductTestData.validProductList);
  });
});
