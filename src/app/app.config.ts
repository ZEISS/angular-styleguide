/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { CatalogModule } from '@app/catalog/catalog.module';
import { provideStore } from '@ngrx/store';
import { metaReducers, reducers } from '@app/reducers';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { environment } from '@environment';
import { provideEffects } from '@ngrx/effects';
import { NavigationEffects } from '@app/shared/navigation/navigation.effects';

const storeProviders = [
  provideStore(reducers, {
    metaReducers,
  }),
  provideStoreDevtools({
    maxAge: 25,
    logOnly: environment.production,
  }),
  provideEffects(NavigationEffects),
];

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(CatalogModule), provideRouter(routes), storeProviders],
};
