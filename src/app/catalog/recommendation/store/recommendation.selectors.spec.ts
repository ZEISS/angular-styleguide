import { recommendationFeatureKey } from './recommendation.reducer';
import { selectRecommendations } from './recommendation.selectors';
import { RecommendationTestData } from '@models/recommendation.testdata';
import { catalogFeatureKey, StateWithCatalog } from '@app/catalog/store/catalog.reducer';


describe('Recommendation Selectors', () => {
  describe('selectRecommendations', () => {
    it('should select the recommendations', () => {
      const state = {
        [catalogFeatureKey]: {
          [recommendationFeatureKey]: {
            recommendations: RecommendationTestData.validRecommendations
          }
        }
      } as StateWithCatalog;
      expect(selectRecommendations(state)).toEqual(RecommendationTestData.validRecommendations);
    });
  });
});
