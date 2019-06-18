import { inject, TestBed } from '@angular/core/testing';
import { ProductEpics } from '@app/product/store/epics';
import { ProductService } from '@app/product/services/product.service';
import {
  LoadProductsSuccessfulAction,
  ProductAction,
  ProductActions,
  ProductActionTypes,
  StartLoadProductsAction
} from '@app/product/store/actions';
import { ActionsObservable } from 'redux-observable';
import { Observable, of } from 'rxjs';
import { NavigationActions } from '@store/navigation.actions';
import { ProductTestData } from '@models/product.testdata';

describe('ProductEpic', () => {

  const mocks = {
    get loadProductSuccessfulAction(): LoadProductsSuccessfulAction {
      return {
        type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
        payload: ProductTestData.validProductList,
      };
    },
  };

  beforeEach(() => {
    const productServiceStub: ProductService = new ProductService(null);
    const productActionsStub: ProductActions = new ProductActions(null);
    const navigationActionsStub: NavigationActions = new NavigationActions(null);

    TestBed.configureTestingModule({
      providers: [
        ProductEpics,
        {provide: ProductService, useValue: productServiceStub},
        {provide: ProductActions, useValue: productActionsStub},
        {provide: NavigationActions, useValue: navigationActionsStub},
      ],
    });
  });

  it('should load products from service and dispatch successful action', inject([
    ProductEpics,
    ProductService,
    ProductActions,
  ], (productEpics: ProductEpics, service: ProductService, actions: ProductActions) => {

    // preparation
    const serviceSpy = spyOn(service, 'loadProducts').and.returnValue(of(ProductTestData.validProductList));
    const actionsSpy = spyOn(actions, 'loadProductsSuccessful').and.returnValue(mocks.loadProductSuccessfulAction);

    const startAction: StartLoadProductsAction = {
      type: ProductActionTypes.START_LOAD_PRODUCTS,
    };

    const epic = productEpics.createLoadProductsEpic();

    // execution
    const resultObservable$: Observable<ProductAction> = epic(ActionsObservable.of(startAction), null, null);

    // verification
    expect(resultObservable$).toEmitValues([mocks.loadProductSuccessfulAction]);
    expect(serviceSpy).toHaveBeenCalled();
    expect(actionsSpy).toHaveBeenCalledWith(ProductTestData.validProductList);
  }));
});
