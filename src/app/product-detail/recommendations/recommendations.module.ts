import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationComponent } from './components/recommendation/recommendation.component';
import {SharedModule} from '../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    RecommendationComponent
  ],
  declarations: [RecommendationComponent]
})
export class RecommendationsModule { }
