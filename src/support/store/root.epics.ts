import {Injectable} from '@angular/core';
import {ProductEpics} from '../../app/product/store/epics';
import {combineEpics, Epic} from 'redux-observable';
import {Action} from 'redux';

@Injectable()
export class RootEpics {
  constructor(private productEpic: ProductEpics) {
  }

  public createEpic() {
    return combineEpics(
      this.productEpic.createLoadProductsEpic(),
    ) as Epic<Action<any>>;
  }
}
