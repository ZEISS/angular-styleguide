import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { productFeatureKey, ProductState, reducer as productReducer } from '@app/product/product.reducer';

export interface State {
  [productFeatureKey]: ProductState;
}

export const reducers: ActionReducerMap<State> = {
  [productFeatureKey]: productReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
