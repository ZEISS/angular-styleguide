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
import { Product } from '@models/product';
import { Observable } from 'rxjs';

describe('ProductEpic', () => {

  const mocks = {
    get products(): Product[] {
      return [{
        id: 1,
        title: 'test',
        image: 'none',
        price: '1.99€',
        description: 'empty',
      }];
    },
    get loadProductSuccessfulAction(): LoadProductsSuccessfulAction {
      return {
        type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
        payload: mocks.products,
      };
    },
  };

  beforeEach(() => {
    const productServiceStub: ProductService = new ProductService(null);
    const productActionsStub: ProductActions = new ProductActions(null);

    TestBed.configureTestingModule({
      providers: [
        ProductEpics,
        {provide: ProductService, useValue: productServiceStub},
        {provide: ProductActions, useValue: productActionsStub},
      ],
    });
  });

  fit('should load products from service and dispatch successful action', inject([
    ProductEpics,
    ProductService,
    ProductActions,
  ], (productEpics: ProductEpics, service: ProductService, actions: ProductActions) => {

    // preparation
    const serviceSpy = spyOn(service, 'loadProducts').and.returnValue(mocks.products);
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
    expect(actionsSpy).toHaveBeenCalledWith(...mocks.products);
  }));
});
