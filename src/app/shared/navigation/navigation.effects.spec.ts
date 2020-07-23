import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of } from 'rxjs';

import { NavigationEffects } from './navigation.effects';
import { navigate, navigationFailed } from '@app/shared/navigation/navigation.actions';

describe('NavigationEffects', () => {
  let actions$: Observable<any>;
  let effects: NavigationEffects;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        NavigationEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(NavigationEffects);
    router = TestBed.inject(Router);
  });

  it('should navigate on navigate action', () => {
    spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

    const url = 'some/url';
    const navigationExtras = {};

    actions$ = of(navigate({url, navigationExtras}));

    const result$ = effects.navigate$;
    expect(result$).toEmitNoValues();
    expect(router.navigateByUrl).toHaveBeenCalledWith(url, navigationExtras);
  });

  xit('should dispatch navigation failed action on navigate action', () => {
    spyOn(router, 'navigateByUrl').and.returnValue(Promise.reject('navigation failed'));

    const url = 'some/url';
    const navigationExtras = {};

    actions$ = of(navigate({url, navigationExtras}));

    const result$ = effects.navigate$;
    result$.subscribe(r => console.log('angekommen', r));
    expect(result$).toEmitValues([navigationFailed({error: 'navigation failed'})]);
    expect(result$).toEmitNoError();
    expect(router.navigateByUrl).toHaveBeenCalledWith(url, navigationExtras);
  });
});
