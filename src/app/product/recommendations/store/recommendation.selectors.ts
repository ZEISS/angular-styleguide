import { createFeatureSelector, createSelector } from '@ngrx/store';
import { State } from '@app/reducers';
import { recommendationFeatureKey, RecommendationState } from './recommendation.reducer';

export const selectRecommendationFeature = createFeatureSelector<State, RecommendationState>(recommendationFeatureKey);

export const selectRecommendations = createSelector(selectRecommendationFeature, (state) => state.recommendations);
