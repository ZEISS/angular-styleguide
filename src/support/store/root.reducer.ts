// State als Datentyp
import {combineReducers, Reducer} from 'redux';
import {InitialProductState, productReducer, ProductState} from '../../app/product/store/reducers';
import {InitialRecommendationState, recommendationReducer, RecommendationState} from '../../app/product/recommendations/store/reducers';

export interface RootState {
  product: ProductState;
  recommendation: RecommendationState;
}

// Initialer State
export const INITIAL_ROOTSTATE: RootState = {
  product: InitialProductState,
  recommendation: InitialRecommendationState
};

// Kombination der Reducer
export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  product: productReducer,
  recommendation: recommendationReducer
});
