/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationStore } from '@app/catalog/recommendation/recommendation.store';
import { RecommendationComponent } from '@app/shared/components/recommendation/recommendation.component';

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [CommonModule, RecommendationComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent {
  private recommendationStore = inject(RecommendationStore);

  public recommendations = this.recommendationStore.recommendations;
}
