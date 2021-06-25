import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '@app/reducers';
import { loadRecommendations } from '@app/catalog/recommendation/store/recommendation.actions';
import { selectRecommendations } from '@app/catalog/recommendation/store/recommendation.selectors';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent implements OnInit {
  recommendations$ = this.store.select(selectRecommendations);

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(loadRecommendations());
  }
}
