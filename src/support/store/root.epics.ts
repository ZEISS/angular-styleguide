import {Injectable} from '@angular/core';
import {ProductOverviewEpics} from '../../app/product-overview/store/epics';
import {combineEpics, Epic} from 'redux-observable';
import {Action} from 'redux';

@Injectable()
export class RootEpics {
  constructor(private productOverviewEpic: ProductOverviewEpics) {
  }

  public createEpic() {
    return combineEpics(
      this.productOverviewEpic.createLoadProductsEpic(),
    ) as Epic<Action<any>>;
  }
}
