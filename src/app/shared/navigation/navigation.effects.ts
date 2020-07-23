import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { navigate, navigationFailed } from '@app/shared/navigation/navigation.actions';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { Action } from '@ngrx/store';


@Injectable()
export class NavigationEffects {

  constructor(private actions$: Actions, private router: Router) {
  }

  // TODO Try to use this effect
  // navigate$ = createEffect(() => this.actions$.pipe(
  //   ofType(navigate),
  //   switchMap(({url, navigationExtras}) => from(this.router.navigateByUrl(url, navigationExtras)).pipe(
  //     catchError(error => {
  //       console.error(error);
  //       return of(navigationFailed({ error }));
  //     })
  //   )),
  //   switchMap(() => of<Action>()),
  // ));

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(navigate),
    switchMap(({url, navigationExtras}) => from(this.router.navigateByUrl(url, navigationExtras)
      .then(() => of<Action>())
      .catch(
        error => {
          console.error(error);
          return of(navigationFailed({ error }));
        }))
    ),
    switchMap(action => action)
  ));

}
