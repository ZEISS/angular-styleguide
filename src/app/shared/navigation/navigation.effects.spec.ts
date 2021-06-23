import { TestBed } from '@angular/core/testing';
import { NavigationExtras, Router } from '@angular/router';
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

  describe('navigate$', () => {
    it('should navigate to url and dispatch no action if navigation succeded', () => {
      spyOn(router, 'navigateByUrl').and.returnValue(Promise.resolve(true));

      const url = 'some/url';
      const navigationExtras: NavigationExtras = {queryParams: {foo: 'bar'}};

      actions$ = of(navigate({url, navigationExtras}));

      const result$ = effects.navigate$;
      expect(result$).toEmitNoValues();
      expect(router.navigateByUrl).toHaveBeenCalledWith(url, navigationExtras);
    });

    it('should dispatch navigationFailed if navigation failed', (done) => {
      spyOn(router, 'navigateByUrl').and.returnValue(Promise.reject('navigation failed'));

      const url = 'some/url';
      const navigationExtras: NavigationExtras = {queryParams: {foo: 'bar'}};

      actions$ = of(navigate({url, navigationExtras}));

      effects.navigate$.subscribe(result => {
        expect(result).toEqual(navigationFailed({error: 'navigation failed'}));
        done();
      });
      expect(router.navigateByUrl).toHaveBeenCalledWith(url, navigationExtras);
    });
  });
});
