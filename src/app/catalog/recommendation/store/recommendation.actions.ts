import { createAction, props } from '@ngrx/store';
import { Recommendation } from '@models/recommendation';

export const loadRecommendations = createAction('[Recommendation] Load Recommendations');

export const loadRecommendationsSuccess = createAction(
  '[Recommendation] Load Recommendations Success',
  props<{ recommendations: Recommendation[] }>()
);
