// Implementierung eines spezielleren Action Datentyps als Erweiterung des generellen
import { ActionCreator, Dispatchable, EmptyAction, MetaAction, PayloadAction } from '@store/root.actions';
import { Injectable } from '@angular/core';
import { Product } from '@models/product';
import { RootState } from '@store/root.reducer';
import { NgRedux } from '@angular-redux/store';

export enum ProductActionTypes {
  START_LOAD_PRODUCTS = 'product::START_LOAD_PRODUCTS',
  LOAD_PRODUCTS_SUCCESSFUL = 'product::LOAD_PRODUCTS_SUCCESSFUL',
  START_LOAD_PRODUCT_DETAILS = 'product::START_LOAD_PRODUCT_DETAILS',
  LOAD_PRODUCT_DETAILS_SUCCESSFUL = 'product::LOAD_PRODUCT_DETAILS_SUCCESSFUL',
}

export interface StartLoadProductsAction extends EmptyAction<ProductActionTypes.START_LOAD_PRODUCTS> {
}

export interface LoadProductsSuccessfulAction extends PayloadAction<ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL, Product[]> {
}

export interface StartLoadProductDetailsAction extends MetaAction<ProductActionTypes.START_LOAD_PRODUCT_DETAILS, {id: number}> {
}

export interface LoadProductDetailsSuccessfulAction extends PayloadAction<ProductActionTypes.LOAD_PRODUCT_DETAILS_SUCCESSFUL, Product> {
}

export type ProductAction = StartLoadProductsAction | LoadProductsSuccessfulAction
  | StartLoadProductDetailsAction | LoadProductDetailsSuccessfulAction;

// Zur Injektion in UI-Komponenten oder Epics
@Injectable()
export class ProductActions extends ActionCreator<ProductActions, RootState> {

  constructor(protected ngRedux: NgRedux<RootState>) {
    super();
  }

  // ActionCreators
  @Dispatchable()
  startLoadProducts(): StartLoadProductsAction {
    return {
      type: ProductActionTypes.START_LOAD_PRODUCTS,
    };
  }

  @Dispatchable()
  loadProductsSuccessful(products: Product[]): LoadProductsSuccessfulAction {
    return {
      type: ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL,
      payload: products,
    };
  }

  @Dispatchable()
  startLoadProductDetails(id: number): StartLoadProductDetailsAction {
    return {
      type: ProductActionTypes.START_LOAD_PRODUCT_DETAILS,
      meta: {
        id,
      }
    };
  }

  @Dispatchable()
  loadProductDetailsSuccessful(product: Product): LoadProductDetailsSuccessfulAction {
    return {
      type: ProductActionTypes.LOAD_PRODUCT_DETAILS_SUCCESSFUL,
      payload: product,
    };
  }
}
