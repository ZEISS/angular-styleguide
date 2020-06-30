import { Component, Input } from '@angular/core';
import { Recommendation } from '@models/recommendation';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent {

  @Input() public recommendation: Recommendation;
}
