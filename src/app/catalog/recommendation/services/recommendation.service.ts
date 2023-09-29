/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Recommendation } from '@models/recommendation';

@Injectable()
export class RecommendationService {
  // for mocking, we're using a local json file.
  // in a real-world app this would be a REST resource on a server
  private readonly recommendationsUrl = './assets/recommendations.json';

  constructor(private httpClient: HttpClient) {}

  loadRecommendations(): Observable<Recommendation[]> {
    return this.httpClient.get<Recommendation[]>(this.recommendationsUrl);
  }
}
