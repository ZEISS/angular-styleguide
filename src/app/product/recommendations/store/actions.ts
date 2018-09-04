// Implementierung eines spezielleren Action Datentyps als Erweiterung des generellen
import {Injectable} from '@angular/core';
import {Recommendation} from '../../../../model/recommendation';
import {Action} from '../../../../support/store/root.actions';

export interface RecommendationAction extends Action<void | Recommendation[]> {}

// Zur Injektion in UI-Komponenten oder Epics
@Injectable()
export class RecommendationActions {
  // ActionTypes
  static readonly LOAD_RECOMMENDATIONS_START = 'LOAD_RECOMMENDATIONS_START';
  static readonly LOAD_RECOMMENDATIONS_SUCCESSFUL = 'LOAD_RECOMMENDATIONS_SUCCESSFUL';

  // ActionCreators
  loadRecommendationsStart = (): RecommendationAction => ({
    type: RecommendationActions.LOAD_RECOMMENDATIONS_START,
  });

  loadRecommendationsSuccessful = (recommendations: Recommendation[]): RecommendationAction => ({
    type: RecommendationActions.LOAD_RECOMMENDATIONS_SUCCESSFUL,
    payload: recommendations,
  });
}
