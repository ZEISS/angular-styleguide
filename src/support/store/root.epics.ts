import { Injectable } from '@angular/core';
import { RecommendationEpics } from '@app/product/recommendations/store/epics';
import { ProductEpics } from '@app/product/store/epics';
import { Action } from 'redux';
import { combineEpics, Epic } from 'redux-observable-es6-compat';

@Injectable()
export class RootEpics {
  constructor(private productEpic: ProductEpics, private recommendationEpic: RecommendationEpics) {
  }

  public createEpic() {
    return combineEpics(
      this.productEpic.createLoadProductsEpic(),
      this.productEpic.createLoadProductDetailsEpic(),
      this.recommendationEpic.createLoadRecommendationsEpic(),
    ) as Epic<Action<any>>;
  }
}
