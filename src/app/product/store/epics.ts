import { Injectable } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductAction, ProductActions, ProductActionTypes, StartLoadProductDetailsAction } from './actions';
import { Epic, ofType } from 'redux-observable';
import { ProductState } from './reducers';
import { flatMap, map, switchMap } from 'rxjs/operators';
import { NavigationAction, NavigationActions } from '@store/navigation.actions';
import { of } from 'rxjs';
import { Product } from '@models/product';

@Injectable()
export class ProductEpics {
  // Service einbinden
  constructor(private service: ProductService, private productActions: ProductActions, private navigationActions: NavigationActions) {
  }

  // Definition des Epics
  public createLoadProductsEpic(): Epic<ProductAction, ProductAction, ProductState> {
    return (action$, store) => action$
      .pipe(
        // Abfrage des ActionTypes
        ofType(ProductActionTypes.START_LOAD_PRODUCTS),
        // Service aufrufen
        switchMap(() => this.service.loadProducts()),
        map((products: Product[]) => this.productActions.loadProductsSuccessful(products)));
  }

  // Definition des Epics
  public createLoadProductDetailsEpic(): Epic<ProductAction, ProductAction | NavigationAction | any, ProductState> {
    return (action$, store) => action$
      .pipe(
        // Abfrage des ActionTypes
        ofType(ProductActionTypes.START_LOAD_PRODUCT_DETAILS),
        // Service aufrufen
        switchMap((action: StartLoadProductDetailsAction) => this.service.getProduct(action.meta.id)),
        flatMap((product: Product) => {
          return of<ProductAction | NavigationAction>(
            this.productActions.loadProductDetailsSuccessful(product),
            this.navigationActions.navigate(`/product/${product.id}`),
          );
        }));
  }
}
