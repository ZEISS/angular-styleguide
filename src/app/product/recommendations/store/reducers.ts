import { Recommendation } from '@models/recommendation';
import { Reducer } from 'redux';
import { ReplicationBuilder } from 'typescript-immutable-helper';
import { RecommendationAction, RecommendationActionTypes } from './actions';

export interface RecommendationState {
  recommendations: Recommendation[];
}

export const InitialRecommendationState: RecommendationState = {
  recommendations: [],
};

export const recommendationReducer: Reducer<RecommendationState> =
  (state: RecommendationState = InitialRecommendationState, action: RecommendationAction) => {

  switch (action.type) {
    case RecommendationActionTypes.LOAD_RECOMMENDATIONS_SUCCESSFUL:
      return ReplicationBuilder.forObject(state)
        .replaceValueOf('recommendations').with(action.payload)
        .build();
    default: {
      return state;
    }
  }
};
