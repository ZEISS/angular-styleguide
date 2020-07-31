import { State } from '@app/reducers';
import { recommendationFeatureKey } from '@app/product/recommendations/recommendation.reducer';
import { selectRecommendations } from '@app/product/recommendations/recommendation.selectors';
import { RecommendationTestData } from '@models/recommendation.testdata';


describe('Recommendation Selectors', () => {
  describe('selectRecommendations', () => {
    it('should select the recommendations', () => {
      const state = {
        [recommendationFeatureKey]: {
          recommendations: RecommendationTestData.validRecommendations
        }
      } as State;
      expect(selectRecommendations(state)).toEqual(RecommendationTestData.validRecommendations);
    });
  });
});
