import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared/shared.module';
import { RecommendationsComponent } from '@app/product/recommendations/components/recommendations/recommendations.component';
import { RecommendationService } from '@app/product/recommendations/services/recommendation.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [RecommendationsComponent],
  exports: [
    RecommendationsComponent,
  ],
  providers: [
    RecommendationService,
  ],
})
export class RecommendationsModule {
}
