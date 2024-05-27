/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { TestBed } from '@angular/core/testing';

import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RecommendationService } from './recommendation.service';
import { RecommendationTestData } from '@models/recommendation.testdata';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

const recommendationsUrl = './assets/recommendations.json';

describe('RecommendationService', () => {
  let service: RecommendationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        RecommendationService,
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(RecommendationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('loadRecommendations', () => {
    it('should retrieve products from api', (done) => {
      service.loadRecommendations().subscribe((products) => {
        expect(products).toEqual(RecommendationTestData.validRecommendations);
        done();
      });

      httpMock
        .expectOne({ url: recommendationsUrl, method: 'GET' })
        .flush(RecommendationTestData.validRecommendations);
      httpMock.verify();
    });
  });
});
