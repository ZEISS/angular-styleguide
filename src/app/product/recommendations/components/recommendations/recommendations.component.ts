import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Recommendation } from '@models/recommendation';
import { Observable } from 'rxjs';
import { RecommendationActions } from '../../store/actions';
import { getRecommendations } from '../../store/selectors';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent implements OnInit {

  @select(getRecommendations)
  public recommendations$: Observable<Recommendation[]>;

  constructor(private recommendationActions: RecommendationActions) { }

  public ngOnInit() {
    this.recommendationActions.dispatch().startLoadRecommendations();
  }

}
