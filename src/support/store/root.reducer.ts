// State als Datentyp
import {combineReducers, Reducer} from 'redux';
import {InitialProductState, productReducer, ProductState} from '../../app/product/store/reducers';

export interface RootState {
  product: ProductState;
}

// Initialer State
export const INITIAL_ROOTSTATE: RootState = {
  product: InitialProductState
};

// Kombination der Reducer
export const rootReducer: Reducer<RootState> = combineReducers<RootState>({
  product: productReducer
});
