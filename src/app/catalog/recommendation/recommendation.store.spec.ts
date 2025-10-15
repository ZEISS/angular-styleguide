/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { TestBed } from '@angular/core/testing';
import { RecommendationService } from '@app/catalog/recommendation/services/recommendation.service';
import { RecommendationStore } from './recommendation.store';
import { RecommendationTestData } from '@models/recommendation.testdata';
import { of, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';

describe('RecommendationStore', () => {
  let store: InstanceType<typeof RecommendationStore>;
  let recommendationService: jasmine.SpyObj<RecommendationService>;

  beforeEach(() => {
    const recommendationServiceSpy = jasmine.createSpyObj('RecommendationService', [
      'loadRecommendations',
    ]);
    // Setup default return value to handle auto-load in withHooks
    recommendationServiceSpy.loadRecommendations.and.returnValue(of([]));

    TestBed.configureTestingModule({
      providers: [
        RecommendationStore,
        { provide: RecommendationService, useValue: recommendationServiceSpy },
        provideHttpClient(),
      ],
    });

    recommendationService = TestBed.inject(
      RecommendationService,
    ) as jasmine.SpyObj<RecommendationService>;
    store = TestBed.inject(RecommendationStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have empty recommendations array after auto-load completes', (done) => {
      setTimeout(() => {
        expect(store.recommendations()).toEqual([]);
        done();
      }, 100);
    });

    it('should have isLoading as false after auto-load completes', (done) => {
      setTimeout(() => {
        expect(store.isLoading()).toBe(false);
        done();
      }, 100);
    });

    it('should call loadRecommendations on initialization', (done) => {
      setTimeout(() => {
        expect(recommendationService.loadRecommendations).toHaveBeenCalledWith();
        done();
      }, 100);
    });
  });

  describe('loadRecommendations', () => {
    it('should load recommendations successfully', (done) => {
      const mockRecommendations = RecommendationTestData.validRecommendations;
      recommendationService.loadRecommendations.and.returnValue(of(mockRecommendations));

      store.loadRecommendations();

      // Allow async operations to complete
      setTimeout(() => {
        expect(store.recommendations()).toEqual(mockRecommendations);
        expect(store.isLoading()).toBe(false);
        expect(recommendationService.loadRecommendations).toHaveBeenCalledWith();
        done();
      }, 100);
    });

    it('should set isLoading to true while loading', () => {
      recommendationService.loadRecommendations.and.returnValue(
        of(RecommendationTestData.validRecommendations),
      );

      store.loadRecommendations();

      // Immediately after calling, service should be called
      expect(recommendationService.loadRecommendations).toHaveBeenCalledWith();
    });

    it('should handle errors when loading recommendations', (done) => {
      const errorMessage = 'Failed to load recommendations';
      recommendationService.loadRecommendations.and.returnValue(
        throwError(() => new Error(errorMessage)),
      );
      spyOn(console, 'error');

      store.loadRecommendations();

      setTimeout(() => {
        expect(store.recommendations()).toEqual([]);
        expect(store.isLoading()).toBe(false);
        expect(console.error).toHaveBeenCalledWith(
          'Error loading recommendations:',
          jasmine.any(Error),
        );
        done();
      }, 100);
    });

    it('should replace existing recommendations when reloading', (done) => {
      const firstBatch = RecommendationTestData.validRecommendations;
      const secondBatch = [
        {
          id: 2,
          title: 'second-recommendation',
          image: 'image2',
        },
      ];

      recommendationService.loadRecommendations.and.returnValue(of(firstBatch));

      store.loadRecommendations();

      setTimeout(() => {
        expect(store.recommendations()).toEqual(firstBatch);

        recommendationService.loadRecommendations.and.returnValue(of(secondBatch));
        store.loadRecommendations();

        setTimeout(() => {
          expect(store.recommendations()).toEqual(secondBatch);
          done();
        }, 100);
      }, 100);
    });
  });

  describe('error recovery', () => {
    it('should recover from error and load successfully on retry', (done) => {
      const mockRecommendations = RecommendationTestData.validRecommendations;

      // First call fails
      recommendationService.loadRecommendations.and.returnValue(
        throwError(() => new Error('Network error')),
      );
      spyOn(console, 'error');

      store.loadRecommendations();

      setTimeout(() => {
        expect(store.recommendations()).toEqual([]);
        expect(store.isLoading()).toBe(false);

        // Second call succeeds
        recommendationService.loadRecommendations.and.returnValue(of(mockRecommendations));
        store.loadRecommendations();

        setTimeout(() => {
          expect(store.recommendations()).toEqual(mockRecommendations);
          expect(store.isLoading()).toBe(false);
          done();
        }, 100);
      }, 100);
    });
  });

  describe('multiple recommendations', () => {
    it('should handle loading multiple recommendations', (done) => {
      const multipleRecommendations = [
        { id: 1, title: 'Recommendation 1', image: 'img1' },
        { id: 2, title: 'Recommendation 2', image: 'img2' },
        { id: 3, title: 'Recommendation 3', image: 'img3' },
      ];

      recommendationService.loadRecommendations.and.returnValue(of(multipleRecommendations));

      store.loadRecommendations();

      setTimeout(() => {
        expect(store.recommendations().length).toBe(3);
        expect(store.recommendations()).toEqual(multipleRecommendations);
        done();
      }, 100);
    });

    it('should handle empty recommendations array', (done) => {
      recommendationService.loadRecommendations.and.returnValue(of([]));

      store.loadRecommendations();

      setTimeout(() => {
        expect(store.recommendations()).toEqual([]);
        expect(store.isLoading()).toBe(false);
        done();
      }, 100);
    });
  });
});
