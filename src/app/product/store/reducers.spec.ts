import { InitialProductState, productReducer, ProductState } from '@app/product/store/reducers';
import { LoadProductsSuccessfulAction, ProductActionTypes } from '@app/product/store/actions';
import { Product } from '@models/product';
import { EmptyAction } from '@store/root.actions';
import { ProductTestData } from '@models/product.testdata';

describe('ProductReducer', () => {

  it('should handle LoadProductSuccessfulAction correctly', () => {
    // preparation
    const productState: ProductState = InitialProductState;

    const loadProductSuccessfulAction: LoadProductsSuccessfulAction = {
      type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
      payload: ProductTestData.validProductList,
    };

    // execution
    const newProductState = productReducer(productState, loadProductSuccessfulAction);

    // verification
    expect(newProductState).toEqual({
      products: ProductTestData.validProductList,
      currentProductDetails: null,
    });
  });

  it('should not change state when processing unrelated actions', () => {
    // preparation
    const productState: ProductState = {
      products: ProductTestData.validProductList,
      currentProductDetails: null,
    };

    const anotherAction: EmptyAction<string> = {
      type: 'OTHER_ACTION',
    };

    // execution
    const newProductState = productReducer(productState, anotherAction);

    // verification
    expect(newProductState).toEqual({
      products: ProductTestData.validProductList,
      currentProductDetails: null,
    });
  });
});
