import { NgReduxTestingModule } from '@angular-redux/store/testing';
import { inject, TestBed } from '@angular/core/testing';
import { ProductActions, ProductActionTypes } from '@app/product/store/actions';
import { Product } from '@models/product';
import { ProductTestData } from '@models/product.testdata';

describe('ProductActions', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgReduxTestingModule],
      providers: [ProductActions],
    });
  });

  it('should generate a valid StartLoadProducts action', inject([ProductActions], (productActions: ProductActions) => {
    // preparation

    // execution
    const productAction = productActions.startLoadProducts();

    // verification
    expect(productAction).toEqual({
      type: ProductActionTypes.START_LOAD_PRODUCTS,
    });
  }));

  it('should generate a valid LoadProductsSuccessful action', inject([ProductActions], (productActions: ProductActions) => {
    // preparation

    // execution
    const productAction = productActions.loadProductsSuccessful(ProductTestData.validProductList);

    // verification
    expect(productAction).toEqual({
      type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
      payload: ProductTestData.validProductList,
    });
  }));
});
