/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { RecommendationService } from '@app/catalog/recommendation/services/recommendation.service';
import { loadRecommendations, loadRecommendationsSuccess } from './recommendation.actions';

@Injectable()
export class RecommendationEffects {
  constructor(private actions$: Actions, private service: RecommendationService) {}

  loadRecommendations$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRecommendations),
      switchMap(() =>
        this.service.loadRecommendations().pipe(
          map((recommendations) => loadRecommendationsSuccess({ recommendations })),
          catchError(() => EMPTY)
        )
      )
    )
  );
}
