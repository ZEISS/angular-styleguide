/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { environment } from '@environment';

export interface State {
  // Here goes state of the core app. Feature state is defined in feature modules instead.
}

export const reducers: ActionReducerMap<State> = {};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];
