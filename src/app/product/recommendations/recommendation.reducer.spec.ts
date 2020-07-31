import { reducer, initialState } from './recommendation.reducer';
import { loadRecommendationsSuccess } from '@app/product/recommendations/recommendation.actions';
import { RecommendationTestData } from '@models/recommendation.testdata';

describe('Recommendation Reducer', () => {
  describe('an unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });

  describe('a loadRecommendationsSuccess action', () => {
    it('should put recommendations into state', () => {
      const action = loadRecommendationsSuccess({recommendations: RecommendationTestData.validRecommendations});

      const result = reducer(initialState, action);

      expect(result).toEqual({...initialState, recommendations: RecommendationTestData.validRecommendations});
    });
  });
});
