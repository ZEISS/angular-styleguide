import { inject, TestBed } from '@angular/core/testing';

import { RecommendationService } from './recommendation.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RecommendationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecommendationService],
      imports: [HttpClientTestingModule],
    });
  });

  it('should be created', inject([RecommendationService], (service: RecommendationService) => {
    expect(service).toBeTruthy();
  }));
});
