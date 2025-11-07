/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';

import { AppState } from '@app/reducers';
import { loadRecommendations } from '@app/catalog/recommendation/store/recommendation.actions';
import { selectRecommendations } from '@app/catalog/recommendation/store/recommendation.selectors';
import { RecommendationComponent } from '@app/shared/components/recommendation/recommendation.component';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, RecommendationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent implements OnInit {
  recommendations$ = this.store.select(selectRecommendations);

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(loadRecommendations());
  }
}
