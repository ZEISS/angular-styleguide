/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { inject } from '@angular/core';
import { RecommendationService } from '@app/catalog/recommendation/services/recommendation.service';
import { Recommendation } from '@models/recommendation';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withHooks, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap, tap } from 'rxjs';

interface RecommendationState {
  recommendations: Recommendation[];
  isLoading: boolean;
}

const initialState: RecommendationState = {
  recommendations: [],
  isLoading: false,
};

/**
 * NgRx Signal store implementation for recommendation management
 * Handles loading and storing product recommendations
 * read more: https://ngrx.io/guide/signals/signal-store
 */
export const RecommendationStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, recommendationService = inject(RecommendationService)) => ({
    loadRecommendations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() =>
          recommendationService.loadRecommendations().pipe(
            tapResponse({
              next: (recommendations) => patchState(store, { recommendations }),
              error: (error) => console.error('Error loading recommendations:', error),
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
  })),
  withHooks({
    onInit(store) {
      // Auto-load recommendations when store initializes
      store.loadRecommendations();
    },
  }),
);
