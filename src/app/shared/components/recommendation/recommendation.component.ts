import {Component, Input, OnInit} from '@angular/core';
import {Recommendation} from '../../../../model/recommendation';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  @Input() recommendation: Recommendation;
  constructor() { }

  ngOnInit() {
  }

}
