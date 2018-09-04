import {Component, OnInit} from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {Observable} from 'rxjs';
import {RecommendationActions} from '../../store/actions';
import {RootState} from '../../../../../support/store/root.reducer';
import {getRecommendations} from '../../store/selectors';
import {Recommendation} from '../../../../../model/recommendation';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent implements OnInit {

  @select(getRecommendations)
  recommendations$: Observable<Recommendation[]>;

  constructor(private recommendationActions: RecommendationActions, private ngRedux: NgRedux<RootState>) { }

  ngOnInit() {
    this.ngRedux.dispatch(this.recommendationActions.loadRecommendationsStart());
  }

}
