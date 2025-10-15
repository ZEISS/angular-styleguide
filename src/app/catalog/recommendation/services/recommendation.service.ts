/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { Recommendation } from '@models/recommendation';

@Injectable({ providedIn: 'root' })
export class RecommendationService {
  private httpClient = inject(HttpClient);

  // for mocking, we're using a local json file.
  // in a real-world app this would be a REST resource on a server
  private readonly recommendationsUrl = './assets/recommendations.json';

  loadRecommendations(): Observable<Recommendation[]> {
    return this.httpClient.get<Recommendation[]>(this.recommendationsUrl);
  }
}
