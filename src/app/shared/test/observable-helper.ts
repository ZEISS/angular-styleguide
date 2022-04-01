import { RunHelpers, TestScheduler } from 'rxjs/testing';

export function testObservable(
  testCallback: (runHelpers: RunHelpers, scheduler: TestScheduler) => void,
  invertAssertion?: boolean
) {
  const scheduler: TestScheduler = new TestScheduler((actual, expected) =>
    !invertAssertion ? expect(actual).toEqual(expected) : expect(actual).not.toEqual(expected)
  );
  scheduler.run((runHelpers) => testCallback(runHelpers, scheduler));
}
