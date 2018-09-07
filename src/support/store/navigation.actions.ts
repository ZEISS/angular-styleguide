import {UPDATE_LOCATION} from '@angular-redux/router';
import {Action} from './root.actions';
import {Injectable} from '@angular/core';

export type NavigationAction = Action<string>;

@Injectable()
export class NavigationActions {
  navigate = (target: string): Action<string> => ({
    type: UPDATE_LOCATION,
    payload: target,
  })
}
