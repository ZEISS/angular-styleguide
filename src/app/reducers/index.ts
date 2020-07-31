import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@environment';
import { productFeatureKey, ProductState, reducer as productReducer } from '@app/product/product.reducer';
import { recommendationFeatureKey, RecommendationState, reducer as recommendationReducer } from '@app/product/recommendations/recommendation.reducer';

export interface State {
  [productFeatureKey]: ProductState;
  [recommendationFeatureKey]: RecommendationState;
}

export const reducers: ActionReducerMap<State> = {
  [productFeatureKey]: productReducer,
  [recommendationFeatureKey]: recommendationReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
