/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { RecommendationsComponent } from '@app/catalog/recommendation/components/recommendations/recommendations.component';
import { RecommendationService } from '@app/catalog/recommendation/services/recommendation.service';
import { RecommendationEffects } from '@app/catalog/recommendation/store/recommendation.effects';
import { RecommendationComponent } from '@app/shared/components/recommendation/recommendation.component';

@NgModule({
  imports: [
    CommonModule,
    RecommendationComponent,
    EffectsModule.forFeature([RecommendationEffects]),
  ],
  declarations: [RecommendationsComponent],
  exports: [RecommendationsComponent],
  providers: [RecommendationService],
})
export class RecommendationModule {}
