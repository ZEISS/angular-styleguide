import { createSelector } from '@ngrx/store';
import { recommendationFeatureKey } from './recommendation.reducer';
import { selectCatalogFeature } from '@app/catalog/store/catalog.reducer';

export const selectRecommendationFeature = createSelector(
  selectCatalogFeature,
  (state) => state[recommendationFeatureKey]
);

export const selectRecommendations = createSelector(
  selectRecommendationFeature,
  (state) => state.recommendations
);
