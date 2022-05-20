/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { RunHelpers, TestScheduler } from 'rxjs/testing';

/**
 * Helper method for creating a test scheduler in order to use marble testing.
 *
 * @param testCallback for checking the expected observable results
 * @param invertAssertion flag for checking objects to be equals or not to be equals
 */
export function testObservable(
  testCallback: (runHelpers: RunHelpers, scheduler: TestScheduler) => void,
  invertAssertion?: boolean
) {
  const scheduler: TestScheduler = new TestScheduler((actual, expected) =>
    !invertAssertion ? expect(actual).toEqual(expected) : expect(actual).not.toEqual(expected)
  );
  scheduler.run((runHelpers) => testCallback(runHelpers, scheduler));
}
