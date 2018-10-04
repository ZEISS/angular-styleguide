import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { SharedModule } from '@app/shared/shared.module';
import { RecommendationActions } from './store/actions';
import { RecommendationEpics } from './store/epics';
import { RecommendationService } from './services/recommendation.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RecommendationsComponent
  ],
  declarations: [RecommendationsComponent],
  providers: [
  RecommendationActions,
  RecommendationEpics,
  RecommendationService
]
})
export class RecommendationsModule { }
