import * as fromRecommendation from './recommendation.actions';

describe('loadRecommendations', () => {
  it('should return an action', () => {
    expect(fromRecommendation.loadRecommendations().type).toBe('[Recommendation] Load Recommendations');
  });
});
