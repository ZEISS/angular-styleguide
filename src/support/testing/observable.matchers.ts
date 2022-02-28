import { Observable } from 'rxjs';

import CustomMatcher = jasmine.CustomMatcher;
import CustomMatcherResult = jasmine.CustomMatcherResult;

declare global {
  namespace jasmine {
    interface Matchers<T> {
      toEmitValues<V>(expected: V[]): boolean;
      toEmitNoValues(): boolean;
      toEmitError<E>(expected: E): boolean;
      toEmitNoError(): boolean;
    }
  }
}

const observableMatchers: jasmine.CustomMatcherFactories = {
  toEmitValues<T>(util: jasmine.MatchersUtil): CustomMatcher {
    return {
      compare(actual$: Observable<T>, expected: T[]): CustomMatcherResult {
        const values = [];
        actual$.subscribe({
          next: (val) => values.push(val),
          error: (error) => console.warn(`Error received: ${error}`),
        });

        const pass = util.equals(values, expected);

        return {
          pass,
          message: pass
            ? `Observable should not emit ${JSON.stringify(expected)}, but it does`
            : `Observable should emit ${JSON.stringify(expected)} but it emitted ${JSON.stringify(
                values
              )}`,
        };
      },
    };
  },
  toEmitNoValues<T>(util: jasmine.MatchersUtil): CustomMatcher {
    return {
      compare(actual$: Observable<T>): CustomMatcherResult {
        const values = [];
        actual$.subscribe((val) => values.push(val));

        const pass = util.equals(values, []);

        return {
          pass,
          message: pass
            ? `Observable should have emitted something, but it didn't`
            : `Observable shouldn't emit something but it emitted ${JSON.stringify(values)}`,
        };
      },
    };
  },
  toEmitError<T, E>(util: jasmine.MatchersUtil): CustomMatcher {
    return {
      compare(actual$: Observable<T>, expected: E): CustomMatcherResult {
        let error;
        actual$.subscribe({ next: () => {}, error: (err) => (error = err) });

        const pass = util.equals(error, expected);

        return {
          pass,
          message: pass
            ? `Observable should not emit error ${expected}, but it does`
            : `Observable should emit error ${expected} but it emitted ${error}`,
        };
      },
    };
  },
  toEmitNoError<T>(util: jasmine.MatchersUtil): CustomMatcher {
    return {
      compare(actual$: Observable<T>): CustomMatcherResult {
        let error;
        actual$.subscribe({ next: () => {}, error: (err) => (error = err) });

        const pass = !Boolean(error);

        return {
          pass,
          message: pass
            ? `Observable should have emitted an error, but it didn't`
            : `Observable shouldn't emit an error but it emitted error ${error}`,
        };
      },
    };
  },
};

beforeEach(() => {
  jasmine.addMatchers(observableMatchers);
});
