import { ProductState } from '@app/product/store/reducers';
import { getProducts } from '@app/product/store/selectors';
import { Product } from '@models/product';
import { ProductTestData } from '@models/product.testdata';
import { RootState } from '@store/root.reducer';

describe('ProductSelectors', () => {

  it('should return products on getProducts call', () => {
    // preparations
    const state: RootState = {
      product: {
        products: ProductTestData.validProductList,
      },
    } as RootState;

    // executions
    const products = getProducts(state);

    // verification
    expect(products).toEqual(ProductTestData.validProductList);
  });
});
