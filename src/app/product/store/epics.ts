import { Injectable } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductAction, ProductActions, ProductActionTypes } from './actions';
import { Epic } from 'redux-observable';
import { ProductState } from './reducers';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class ProductEpics {
  // Service einbinden
  constructor(private service: ProductService, private productActions: ProductActions) {
  }

  // Definition des Epics
  public createLoadProductsEpic(): Epic<ProductAction, ProductAction, ProductState> {
    return (action$, store) => action$
      // Abfrage des ActionTypes
      .ofType(ProductActionTypes.START_LOAD_PRODUCTS)
      .pipe(
        // Service aufrufen
        switchMap(() => this.service.loadProducts()),
        map(products => this.productActions.loadProductsSuccessful(products)));
  }
}
