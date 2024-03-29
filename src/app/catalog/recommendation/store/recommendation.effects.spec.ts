/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';

import { RecommendationService } from '@app/catalog/recommendation/services/recommendation.service';
import { RecommendationTestData } from '@models/recommendation.testdata';
import { loadRecommendations, loadRecommendationsSuccess } from './recommendation.actions';
import { RecommendationEffects } from './recommendation.effects';
import { testObservable } from '@support/testing/observable-helper';

describe('RecommendationEffects', () => {
  let actions$: Observable<Action>;
  let effects: RecommendationEffects;
  let recommendationServiceSpy: jasmine.SpyObj<RecommendationService>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecommendationEffects,
        provideMockActions(() => actions$),
        {
          provide: RecommendationService,
          useValue: jasmine.createSpyObj<RecommendationService>(['loadRecommendations']),
        },
      ],
    });

    effects = TestBed.inject(RecommendationEffects);
    recommendationServiceSpy = TestBed.inject(
      RecommendationService
    ) as jasmine.SpyObj<RecommendationService>;
  });

  describe('loadRecommendations$', () => {
    it('should load recommendations from service and dispatch successful action', () => {
      const loadedRecommendations = RecommendationTestData.validRecommendations;
      recommendationServiceSpy.loadRecommendations.and.returnValue(of(loadedRecommendations));

      actions$ = of(loadRecommendations());
      const result$ = effects.loadRecommendations$;

      testObservable(({ expectObservable }) => {
        expectObservable(result$).toBe('(a|)', {
          a: loadRecommendationsSuccess({ recommendations: loadedRecommendations }),
        });
      });

      expect(recommendationServiceSpy.loadRecommendations).toHaveBeenCalledWith();
    });

    it('should dispatch an empty action if service throws', () => {
      recommendationServiceSpy.loadRecommendations.and.returnValue(
        throwError(new HttpErrorResponse({}))
      );

      actions$ = of(loadRecommendations());
      const result$ = effects.loadRecommendations$;

      testObservable(({ expectObservable }) => {
        expectObservable(result$).toBe('(|)', {});
      });
    });
  });
});
