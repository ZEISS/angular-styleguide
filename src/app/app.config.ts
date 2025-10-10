/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { metaReducers, reducers } from '@app/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '@environment';
import { provideEffects } from '@ngrx/effects';
import { NavigationEffects } from '@app/shared/navigation/navigation.effects';
import { RecommendationEffects } from './catalog/recommendation/store/recommendation.effects';
import { ProductEffects } from './catalog/product/store/product.effects';
import { catalogFeatureKey, reducer } from './catalog/store/catalog.reducer';
import { provideHttpClient } from '@angular/common/http';

const storeProviders = [
  provideStore(reducers, {
    metaReducers,
  }),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: environment.production,
    connectInZone: true,
  }),
  provideEffects(NavigationEffects),
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    storeProviders,
    provideEffects(RecommendationEffects, ProductEffects),
    provideState(catalogFeatureKey, reducer),
  ],
};
