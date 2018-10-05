import { InitialProductState, productReducer, ProductState } from '@app/product/store/reducers';
import { LoadProductsSuccessfulAction, ProductActionTypes } from '@app/product/store/actions';
import { Product } from '@models/product';
import { EmptyAction } from '@store/root.actions';

describe('ProductReducer', () => {

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

  it('should handle LoadProductSuccessfulAction correctly', () => {
    // preparation
    const productState: ProductState = InitialProductState;

    const loadProductSuccessfulAction: LoadProductsSuccessfulAction = {
      type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
      payload: mocks.products,
    };

    // execution
    const newProductState = productReducer(productState, loadProductSuccessfulAction);

    // verification
    expect(newProductState).toEqual({
      products: mocks.products,
    });
  });

  it('should not change state when processing unrelated actions', () => {
    // preparation
    const productState: ProductState = {
      products: mocks.products
    };

    const anotherAction: EmptyAction<string> = {
      type: 'OTHER_ACTION',
    };

    // execution
    const newProductState = productReducer(productState, anotherAction);

    // verification
    expect(newProductState).toEqual({
      products: mocks.products,
    });
  });
});
