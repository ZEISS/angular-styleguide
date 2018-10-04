import { inject, TestBed } from '@angular/core/testing';

import { RecommendationService } from './recommendation.service';

describe('RecommendationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationService]
    });
  });

  it('should be created', inject([RecommendationService], (service: RecommendationService) => {
    expect(service).toBeTruthy();
  }));
});
