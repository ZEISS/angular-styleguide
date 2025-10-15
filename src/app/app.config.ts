/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideHttpClient(), provideRouter(routes)],
};
