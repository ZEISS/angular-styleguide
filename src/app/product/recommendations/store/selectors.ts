import { RootState } from '@store/root.reducer';
import { Recommendation } from '@models/recommendation';

export function getRecommendations(rootState: RootState): Recommendation[] {
  return rootState.recommendation.recommendations;
}
