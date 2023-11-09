/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Recommendation } from '@models/recommendation';

@Component({
  selector: 'app-recommendation',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent {
  @Input() recommendation: Recommendation;
}
