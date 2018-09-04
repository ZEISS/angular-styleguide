import {Reducer} from 'redux';
import {ReplicationBuilder} from 'typescript-immutable-helper';
import {RecommendationAction, RecommendationActions} from './actions';
import {Recommendation} from '../../../../model/recommendation';

export interface RecommendationState {
  recommendations: Recommendation[];
}

export const InitialRecommendationState: RecommendationState = {
  recommendations: [],
};

export const recommendationReducer: Reducer<RecommendationState> = (state: RecommendationState = InitialRecommendationState, action: RecommendationAction) => {

  switch (action.type) {
    case RecommendationActions.LOAD_RECOMMENDATIONS_SUCCESSFUL:
      return ReplicationBuilder.forObject(state)
        .replaceValueOf('recommendations').with(action.payload as Recommendation[])
        .build();
    default: {
      return state;
    }
  }
};
