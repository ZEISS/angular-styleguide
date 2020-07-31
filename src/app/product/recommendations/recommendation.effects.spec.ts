import { inject, TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';

import { RecommendationEffects } from './recommendation.effects';
import { RecommendationService } from '@app/product/recommendations/services/recommendation.service';
import { ProductService } from '@app/product/services/product.service';
import { ProductTestData } from '@models/product.testdata';
import { loadProducts, loadProductsSuccess } from '@app/product/product.actions';
import { RecommendationTestData } from '@models/recommendation.testdata';
import { loadRecommendations, loadRecommendationsSuccess } from '@app/product/recommendations/recommendation.actions';

describe('RecommendationEffects', () => {
  let actions$: Observable<Action>;
  let effects: RecommendationEffects;

  const recommendationServiceStub = new RecommendationService(null);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        RecommendationEffects,
        provideMockActions(() => actions$),
        {provide: RecommendationService, useValue: recommendationServiceStub}
      ]
    });

    effects = TestBed.inject(RecommendationEffects);
  });

  it('should load recommendations from service and dispatch successful action',
    inject([RecommendationService], (service: RecommendationService) => {

      // preparation
      const loadedRecommendations = RecommendationTestData.validRecommendations;
      const serviceSpy = spyOn(service, 'loadRecommendations').and.returnValue(of(loadedRecommendations));

      // execution
      actions$ = of(loadRecommendations());
      const resultObservable$ = effects.loadRecommendations$;

      // verification
      expect(resultObservable$).toEmitValues([loadRecommendationsSuccess({recommendations: loadedRecommendations})]);
      expect(serviceSpy).toHaveBeenCalled();
    }));
});
