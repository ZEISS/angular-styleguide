/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { RecommendationModule } from './recommendation.module';

describe('RecommendationModule', () => {
  let recommendationsModule: RecommendationModule;

  beforeEach(() => {
    recommendationsModule = new RecommendationModule();
  });

  it('should create an instance', () => {
    expect(recommendationsModule).toBeTruthy();
  });
});
