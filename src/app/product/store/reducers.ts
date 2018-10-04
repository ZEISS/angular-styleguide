import { Product } from '@models/product';
import { Reducer } from 'redux';
import { ProductAction, ProductActionTypes } from './actions';
import { ReplicationBuilder } from 'typescript-immutable-helper';

export interface ProductState {
  products: Product[];
}

export const InitialProductState: ProductState = {
  products: [],
};

export const productReducer: Reducer<ProductState> = (state: ProductState = InitialProductState, action: ProductAction) => {

  switch (action.type) {
    case ProductActionTypes.LOAD_PRODUCTS_SUCCESSFUL:
      return ReplicationBuilder.forObject(state)
        .replaceValueOf('products').with(action.payload)
        .build();
    default: {
      return state;
    }
  }
};

