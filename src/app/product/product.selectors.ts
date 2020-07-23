import { createSelector } from '@ngrx/store';
import { productFeatureKey } from './product.reducer';
import { State } from '../reducers';

export const selectProductFeature = (state: State) => state[productFeatureKey];

export const selectProducts = createSelector(selectProductFeature, (state) => state.products);
export const selectCurrentProductDetails = createSelector(selectProductFeature, (state) => state.currentProductDetails);
