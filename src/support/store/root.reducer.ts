// State als Datentyp
import {combineReducers, Reducer} from 'redux';
import {InitialProductOverviewState, productOverviewReducer, ProductOverviewState} from '../../app/product-overview/store/reducers';

export interface RootState {
  productOverview: ProductOverviewState;
}

// Initialer State
export const INITIAL_ROOTSTATE: RootState = {
  productOverview: InitialProductOverviewState
};

// Kombination der Reducer
export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  productOverview: productOverviewReducer
});
