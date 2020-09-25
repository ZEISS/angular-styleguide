import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { catchError, switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import { navigate, navigationFailed } from '@app/shared/navigation/navigation.actions';


@Injectable()
export class NavigationEffects {

  constructor(private actions$: Actions, private router: Router) {
  }

  navigate$ = createEffect(() => this.actions$.pipe(
    ofType(navigate),
    switchMap(({url, navigationExtras}) => from(this.router.navigateByUrl(url, navigationExtras)).pipe(
      switchMap(() => of<Action>()),
      catchError(error => {
        console.error(error);
        return of(navigationFailed({error}));
      })
    ))
  ));
}
