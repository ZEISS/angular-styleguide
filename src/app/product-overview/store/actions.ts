// Implementierung eines spezielleren Action Datentyps als Erweiterung des generellen
import {Action} from '../../../support/store/root.actions';
import {Injectable} from '@angular/core';
import {Product} from '../../../model/product';

export interface ProductOverviewAction extends Action<void | Product[]> {};

// Zur Injektion in UI-Komponenten oder Epics
@Injectable()
export class ProductOverviewActions {
  // ActionTypes
  static readonly LOAD_PRODUCTS_START = 'LOAD_PRODUCTS_START';
  static readonly LOAD_PRODUCTS_SUCCESSFUL = 'LOAD_PRODUCTS_SUCCESSFUL';

  // ActionCreators
  loadProductsStart = (): ProductOverviewAction => ({
    type: ProductOverviewActions.LOAD_PRODUCTS_START,
  });

  loadProductsSuccessful = (products: Product[]): ProductOverviewAction => ({
    type: ProductOverviewActions.LOAD_PRODUCTS_SUCCESSFUL,
    payload: products,
  });
}
