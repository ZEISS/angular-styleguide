import {Product} from '../../../model/product';
import {Reducer} from 'redux';
import {ProductOverviewAction, ProductOverviewActions} from './actions';
import {ReplicationBuilder} from 'typescript-immutable-helper';
import {ProductServiceService} from '../services/product-service.service';

export interface ProductOverviewState {
  products: Product[];
}

export const InitialProductOverviewState: ProductOverviewState = {
  products: [],
};

export const productOverviewReducer: Reducer<ProductOverviewState> = (state: ProductOverviewState = InitialProductOverviewState, action: ProductOverviewAction) => {

  switch (action.type) {
    case ProductOverviewActions.LOAD_PRODUCTS_SUCCESSFUL:
      return ReplicationBuilder.forObject(state)
        .replaceValueOf('products').with(action.payload as Product[])
        .build();
    default: {
      return state;
    }
  }
};

