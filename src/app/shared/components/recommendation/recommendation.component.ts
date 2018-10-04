import {Component, Input, OnInit} from '@angular/core';
import {Recommendation} from '@models/recommendation';

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
