import {Injectable} from '@angular/core';
import {ProductServiceService} from '../services/product-service.service';
import {ProductOverviewAction, ProductOverviewActions} from './actions';
import {createEpicMiddleware, Epic} from 'redux-observable';
import {ProductOverviewState} from './reducers';
import {map, switchMap} from 'rxjs/operators';

@Injectable()
export class ProductOverviewEpics {
  // Service einbinden
  constructor(private service: ProductServiceService, private productOverviewActions: ProductOverviewActions) {
  }


  // Definition des Epics
  public createLoadProductsEpic(): Epic<ProductOverviewAction, ProductOverviewAction, ProductOverviewState> {
    return (action$, store) => action$
    // Abfrage des ActionTypes
      .ofType(ProductOverviewActions.LOAD_PRODUCTS_START)
      .pipe(
        // Service aufrufen
        switchMap(a => this.service.loadProducts()),
        map(products => this.productOverviewActions.loadProductsSuccessful(products)));
  }
}
