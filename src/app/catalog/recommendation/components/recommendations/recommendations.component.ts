import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '@app/reducers';
import { loadRecommendations } from '@app/catalog/recommendation/store/recommendation.actions';
import { selectRecommendations } from '@app/catalog/recommendation/store/recommendation.selectors';
import { Recommendation } from '@models/recommendation';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.scss'],
})
export class RecommendationsComponent implements OnInit {

  recommendations$: Observable<Recommendation[]> = this.store.select(selectRecommendations);

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(loadRecommendations());
  }
}
