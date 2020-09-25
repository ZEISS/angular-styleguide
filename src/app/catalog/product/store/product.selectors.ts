import { createSelector } from '@ngrx/store';
import { productFeatureKey } from './product.reducer';
import { selectCatalogFeature } from '@app/catalog/store/catalog.reducer';

export const selectProductFeature = createSelector(selectCatalogFeature, (state) => state[productFeatureKey]);

export const selectProducts = createSelector(selectProductFeature, (state) => state.products);
export const selectCurrentProductDetails = createSelector(selectProductFeature, (state) => state.currentProductDetails);
