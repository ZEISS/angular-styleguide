import { Component, OnInit } from '@angular/core';
import {select} from '@angular-redux/store';
import {getProducts} from '../../../../product-overview/store/selectors';
import {Observable} from 'rxjs';
import {Product} from '../../../../../model/product';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  @select(getProducts)
  products$: Observable<Product[]>;

  constructor() { }

  ngOnInit() {
  }

}
