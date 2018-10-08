import { Injectable } from '@angular/core';
import { ProductEpics } from '@app/product/store/epics';
import { combineEpics, Epic } from 'redux-observable';
import { Action } from 'redux';
import { RecommendationEpics } from '@app/product/recommendations/store/epics';

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
