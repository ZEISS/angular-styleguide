import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of, throwError } from 'rxjs';

import { RecommendationService } from '@app/catalog/recommendation/services/recommendation.service';
import { RecommendationTestData } from '@models/recommendation.testdata';
import { loadRecommendations, loadRecommendationsSuccess } from './recommendation.actions';
import { RecommendationEffects } from './recommendation.effects';

describe('RecommendationEffects', () => {
  let actions$: Observable<Action>;
  let effects: RecommendationEffects;
  let service: RecommendationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecommendationEffects,
        provideMockActions(() => actions$),
        {
          provide: RecommendationService, useValue: {
            loadRecommendations: () => {
            }
          }
        }
      ]
    });

    effects = TestBed.inject(RecommendationEffects);
    service = TestBed.inject(RecommendationService);
  });

  describe('loadRecommendations$', () => {
    it('should load recommendations from service and dispatch successful action', () => {
      const loadedRecommendations = RecommendationTestData.validRecommendations;
      spyOn(service, 'loadRecommendations').and.returnValue(of(loadedRecommendations));

      actions$ = of(loadRecommendations());
      const resultObservable$ = effects.loadRecommendations$;

      expect(resultObservable$).toEmitValues([loadRecommendationsSuccess({recommendations: loadedRecommendations})]);
      expect(service.loadRecommendations).toHaveBeenCalled();
    });


    it('should dispatch an empty action if service throws', () => {
      spyOn(service, 'loadRecommendations').and.returnValue(throwError(new HttpErrorResponse({})));

      actions$ = of(loadRecommendations());
      const resultObservable$ = effects.loadRecommendations$;

      expect(resultObservable$).toEmitNoValues();
    });
  });
});
