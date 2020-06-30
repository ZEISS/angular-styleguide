import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { RecommendationService } from './services/recommendation.service';
import { RecommendationActions } from './store/actions';
import { RecommendationEpics } from './store/epics';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    RecommendationsComponent,
  ],
  declarations: [RecommendationsComponent],
  providers: [
    RecommendationActions,
    RecommendationEpics,
    RecommendationService,
  ],
})
export class RecommendationsModule {
}
