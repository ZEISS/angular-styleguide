import { Nullable } from '@app/shared/global.types';
import { Product } from '@models/product';
import { Reducer } from 'redux';
import { ReplicationBuilder } from 'typescript-immutable-helper';
import { ProductAction, ProductActionTypes } from './actions';

export interface ProductState {
  products: Product[];
  currentProductDetails: Nullable<Product>;
}

export const InitialProductState: ProductState = {
  products: [],
  currentProductDetails: null,
};

export const productReducer: Reducer<ProductState> = (state: ProductState = InitialProductState, action: ProductAction) => {

  switch (action.type) {
    case ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL:
      return ReplicationBuilder.forObject(state)
        .replaceValueOf('products').with(action.payload)
        .build();
    case ProductActionTypes.LOAD_PRODUCT_DETAILS_SUCCESSFUL:
      return ReplicationBuilder.forObject(state)
        .replaceValueOf('currentProductDetails').with(action.payload)
        .build();
    default: {
      return state;
    }
  }
};
