import { RecommendationsModule } from './recommendations.module';

describe('RecommendationsModule', () => {
  let recommendationsModule: RecommendationsModule;

  beforeEach(() => {
    recommendationsModule = new RecommendationsModule();
  });

  it('should create an instance', () => {
    expect(recommendationsModule).toBeTruthy();
  });
});
