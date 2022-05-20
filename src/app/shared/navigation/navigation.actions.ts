/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { createAction, props } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const navigate = createAction(
  '[Navigation] Navigate',
  props<{ url: string; navigationExtras?: NavigationExtras }>()
);

export const navigationFailed = createAction(
  '[Navigation] Navigate Failed',
  props<{ error: string }>()
);
