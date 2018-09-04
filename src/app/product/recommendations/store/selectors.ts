import {RootState} from '../../../../support/store/root.reducer';
import {Recommendation} from '../../../../model/recommendation';

export function getRecommendations(rootState: RootState): Recommendation[] {
  return rootState.recommendation.recommendations;
}
