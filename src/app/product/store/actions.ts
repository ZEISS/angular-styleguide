// Implementierung eines spezielleren Action Datentyps als Erweiterung des generellen
import { ActionCreator, Dispatchable, EmptyAction, PayloadAction } from '@store/root.actions';
import { Injectable } from '@angular/core';
import { Product } from '@models/product';
import { RootState } from '@store/root.reducer';
import { NgRedux } from '@angular-redux/store';

export enum ProductActionTypes {
  START_LOAD_PRODUCTS = 'product::START_LOAD_PRODUCT',
  LOAD_PRODUCTS_SUCCESSFUL = 'product::LOAD_PRODUCTS_SUCCESSFUL',
}

export interface StartLoadProductsAction extends EmptyAction<ProductActionTypes.START_LOAD_PRODUCTS> {
}

export interface LoadProductsSuccessfulAction extends PayloadAction<ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL, Product[]> {
}

export type ProductAction = StartLoadProductsAction | LoadProductsSuccessfulAction;

// Zur Injektion in UI-Komponenten oder Epics
@Injectable()
export class ProductActions extends ActionCreator<ProductActions, RootState> {

  constructor(protected ngRedux: NgRedux<RootState>) {
    super();
  }

  // ActionCreators
  @Dispatchable()
  startLoadProducts(): ProductAction {
    return {
      type: ProductActionTypes.START_LOAD_PRODUCTS,
    };
  }

  @Dispatchable()
  loadProductsSuccessful(products: Product[]): ProductAction {
    return {
      type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
      payload: products,
    };
  }
}
