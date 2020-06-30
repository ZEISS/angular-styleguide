import { Injectable } from '@angular/core';
import { Epic, ofType } from 'redux-observable';
import { map, switchMap } from 'rxjs/operators';
import { RecommendationService } from '../services/recommendation.service';
import { RecommendationAction, RecommendationActions, RecommendationActionTypes } from './actions';
import { RecommendationState } from './reducers';

@Injectable()
export class RecommendationEpics {
  // Service einbinden
  constructor(private service: RecommendationService, private recommendationActions: RecommendationActions) {
  }

  // Definition des Epics
  public createLoadRecommendationsEpic(): Epic<RecommendationAction, RecommendationAction, RecommendationState> {
    return (action$, store) => action$
      .pipe(
        // Abfrage des ActionTypes
        ofType(RecommendationActionTypes.START_LOAD_RECOMMENDATIONS),
        // Service aufrufen
        switchMap((a) => this.service.loadRecommendations()),
        map((recommendations) => this.recommendationActions.loadRecommendationsSuccessful(recommendations)));
  }
}
