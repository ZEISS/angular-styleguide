/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { StoreModule } from '@store/store.module';
import { CatalogModule } from '@app/catalog/catalog.module';

export const appConfig: ApplicationConfig = {
  providers: [importProvidersFrom(StoreModule, CatalogModule), provideRouter(routes)],
};
