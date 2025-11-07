/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { EnvironmentProviders, Provider } from '@angular/core';
import { ProductEffects } from '@app/catalog/product/store/product.effects';
import {
  productFeatureKey,
  ProductReducer,
  ProductState,
} from '@app/catalog/product/store/product.reducer';
import { RecommendationEffects } from '@app/catalog/recommendation/store/recommendation.effects';
import {
  recommendationFeatureKey,
  RecommendationReducer,
  RecommendationState,
} from '@app/catalog/recommendation/store/recommendation.reducer';
import { NavigationEffects } from '@app/shared/navigation/navigation.effects';
import { environment } from '@environment';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
export const catalogFeatureKey = 'catalog';

export interface AppState {
  // Here goes state of the core app. Feature state is defined in feature modules instead.
  [productFeatureKey]: ProductState;
  [recommendationFeatureKey]: RecommendationState;
}

export const storeProviders: Array<Provider | EnvironmentProviders> = [
  provideStoreDevtools({
    maxAge: 25,
    logOnly: environment.production,
    connectInZone: true,
  }),
  provideEffects(RecommendationEffects, ProductEffects, NavigationEffects),
  provideStore(),
  provideState(RecommendationReducer),
  provideState(ProductReducer),
];
