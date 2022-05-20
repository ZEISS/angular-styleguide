/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Recommendation } from './recommendation';

export class RecommendationTestData {
  static get validRecommendations(): Recommendation[] {
    return [
      {
        id: 1,
        title: 'test-title',
        image: 'none',
      },
    ];
  }
}
