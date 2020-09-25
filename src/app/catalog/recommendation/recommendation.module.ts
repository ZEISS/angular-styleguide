import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared/shared.module';
import { RecommendationsComponent } from '@app/catalog/recommendation/components/recommendations/recommendations.component';
import { RecommendationService } from '@app/catalog/recommendation/services/recommendation.service';
import { RecommendationEffects } from '@app/catalog/recommendation/store/recommendation.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    EffectsModule.forFeature([RecommendationEffects]),
  ],
  declarations: [RecommendationsComponent],
  exports: [
    RecommendationsComponent,
  ],
  providers: [
    RecommendationService,
  ],
})
export class RecommendationModule {
}
