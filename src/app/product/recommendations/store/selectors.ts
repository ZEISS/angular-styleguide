import { Recommendation } from '@models/recommendation';
import { RootState } from '@store/root.reducer';

export function getRecommendations(rootState: RootState): Recommendation[] {
  return rootState.recommendation.recommendations;
}
