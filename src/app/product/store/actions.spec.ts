import { inject, TestBed } from '@angular/core/testing';
import { ProductActions, ProductActionTypes } from '@app/product/store/actions';
import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { Product } from '@models/product';

describe('ProductActions', () => {

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxTestingModule],
      providers: [ProductActions]
    });
  });

  fit('should generate a valid StartLoadProducts action', inject([ProductActions], (productActions: ProductActions) => {
    // preparation

    // execution
    const productAction = productActions.startLoadProducts();

    // verification
    expect(productAction).toEqual({
      type: ProductActionTypes.START_LOAD_PRODUCTS,
    });
  }));

  fit('should generate a valid LoadProductsSuccessful action', inject([ProductActions], (productActions: ProductActions) => {
    // preparation

    // execution
    const productAction = productActions.loadProductsSuccessful(mocks.products);

    // verification
    expect(productAction).toEqual({
      type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
      payload: mocks.products,
    });
  }));
});
