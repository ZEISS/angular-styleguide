import { createFeatureSelector, createSelector } from '@ngrx/store';
import { productFeatureKey, ProductState } from './product.reducer';
import { State } from '@app/reducers';

export const selectProductFeature = createFeatureSelector<State, ProductState>(productFeatureKey);

export const selectProducts = createSelector(selectProductFeature, (state) => state.products);
export const selectCurrentProductDetails = createSelector(selectProductFeature, (state) => state.currentProductDetails);
