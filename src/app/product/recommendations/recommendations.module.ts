import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '@app/shared/shared.module';
import { RecommendationsComponent } from './components/recommendations/recommendations.component';
import { RecommendationService } from './services/recommendation.service';
import { RecommendationActions } from './store/actions';
import { RecommendationEpics } from './store/epics';
import { EffectsModule } from '@ngrx/effects';
import { RecommendationEffects } from '@app/product/recommendations/recommendation.effects';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    // TODO Decide if import effects module here or in store module. Currently, app doesn't work if module is not imported here
    EffectsModule.forFeature([RecommendationEffects]),
  ],
  declarations: [RecommendationsComponent],
  exports: [
    RecommendationsComponent,
  ],
  providers: [
    RecommendationActions,
    RecommendationEpics,
    RecommendationService,
  ],
})
export class RecommendationsModule {
}
