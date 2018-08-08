import { Component, OnInit } from '@angular/core';
import {PRODUCTS} from '../../services/product-service.service';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  products = PRODUCTS;
  constructor() { }

  ngOnInit() {
  }

}
