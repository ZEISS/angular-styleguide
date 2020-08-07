import { combineReducers, createFeatureSelector } from '@ngrx/store';
import {
  initialState as productInitialState,
  productFeatureKey,
  ProductState,
  reducer as productReducer
} from '@app/catalog/product/store/product.reducer';
import {
  initialState as recommendationInitialState,
  recommendationFeatureKey,
  RecommendationState,
  reducer as recommendationReducer,
} from '@app/catalog/recommendation/store/recommendation.reducer';
import { State } from '@app/reducers';


export const catalogFeatureKey = 'catalog';

export interface CatalogState {
  [productFeatureKey]: ProductState;
  [recommendationFeatureKey]: RecommendationState;
}

export interface StateWithCatalog extends State {
  [catalogFeatureKey]: CatalogState;
}

export const initialState: CatalogState = {
  [productFeatureKey]: productInitialState,
  [recommendationFeatureKey]: recommendationInitialState
};


export const reducer = combineReducers({
  [productFeatureKey]: productReducer,
  [recommendationFeatureKey]: recommendationReducer
});

export const selectCatalogFeature = createFeatureSelector<StateWithCatalog, CatalogState>(catalogFeatureKey);
