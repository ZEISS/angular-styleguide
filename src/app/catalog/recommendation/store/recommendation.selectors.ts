/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { AppState } from '@app/reducers';
import { createSelector } from '@ngrx/store';
import { recommendationFeatureKey } from './recommendation.reducer';

const selectRecommendationFeature = (state: AppState) => state[recommendationFeatureKey];

export const selectRecommendations = createSelector(
  selectRecommendationFeature,
  (state) => state.recommendations,
);
