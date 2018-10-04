import { Component, OnInit } from '@angular/core';
import { select } from '@angular-redux/store';
import { getProducts } from '../../store/selectors';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { ProductActions } from '../../store/actions';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  @select(getProducts)
  products$: Observable<Product[]>;

  constructor(private productActions: ProductActions) {
  }

  ngOnInit() {
    this.productActions.dispatch().startLoadProducts();
  }
}
