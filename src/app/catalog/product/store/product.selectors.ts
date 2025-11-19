/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { AppState } from '@app/reducers';
import { createSelector } from '@ngrx/store';
import { productFeatureKey } from './product.reducer';

const selectProductFeature = (state: AppState) => state[productFeatureKey];

export const selectProducts = createSelector(selectProductFeature, (state) => state.products);
export const selectCurrentProductDetails = createSelector(
  selectProductFeature,
  (state) => state.currentProductDetails,
);
