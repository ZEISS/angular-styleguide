import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { Observable } from 'rxjs';
import { RecommendationActions } from '../../store/actions';
import { getRecommendations } from '../../store/selectors';
import { Recommendation } from '@models/recommendation';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  @select(getRecommendations)
  recommendations$: Observable<Recommendation[]>;

  constructor(private recommendationActions: RecommendationActions) { }

  ngOnInit() {
    this.recommendationActions.dispatch().startLoadRecommendations();
  }

}
