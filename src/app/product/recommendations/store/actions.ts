// Implementierung eines spezielleren Action Datentyps als Erweiterung des generellen
import { Injectable } from '@angular/core';
import { Recommendation } from '@models/recommendation';
import { ActionCreator, Dispatchable, EmptyAction, PayloadAction } from '@store/root.actions';
import { NgRedux } from '@angular-redux/store';
import { RootState } from '@store/root.reducer';

export enum RecommendationActionTypes {
  START_LOAD_RECOMMENDATIONS = 'product::START_LOAD_RECOMMENDATIONS',
  LOAD_RECOMMENDATIONS_SUCCESSFUL = 'product::LOAD_RECOMMENDATIONS_SUCCESSFUL',
}

export interface StartLoadRecommendationsAction extends EmptyAction<RecommendationActionTypes.START_LOAD_RECOMMENDATIONS> {
}

export interface LoadRecommendationsSuccessfulAction extends PayloadAction<RecommendationActionTypes.LOAD_RECOMMENDATIONS_SUCCESSFUL, Recommendation[]> {
}

export type RecommendationAction = StartLoadRecommendationsAction | LoadRecommendationsSuccessfulAction;

// Zur Injektion in UI-Komponenten oder Epics
@Injectable()
export class RecommendationActions extends ActionCreator<RecommendationActions, RootState> {

  constructor(protected ngRedux: NgRedux<RootState>) {
    super();
  }

  // ActionCreators
  @Dispatchable()
  startLoadRecommendations(): RecommendationAction {
    return {
      type: RecommendationActionTypes.START_LOAD_RECOMMENDATIONS,
    };
  }

  @Dispatchable()
  loadRecommendationsSuccessful(recommendations: Recommendation[]): RecommendationAction {
    return {
      type: RecommendationActionTypes.LOAD_RECOMMENDATIONS_SUCCESSFUL,
      payload: recommendations,
    };
  }
}
