/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { createReducer, on } from '@ngrx/store';
import { Recommendation } from '@models/recommendation';
import { loadRecommendationsSuccess } from './recommendation.actions';

export const recommendationFeatureKey = 'recommendation';

export interface RecommendationState {
  recommendations: Recommendation[];
}

export const initialState: RecommendationState = {
  recommendations: [],
};

export const reducer = createReducer(
  initialState,
  on(loadRecommendationsSuccess, (state, { recommendations }) => ({ ...state, recommendations }))
);
