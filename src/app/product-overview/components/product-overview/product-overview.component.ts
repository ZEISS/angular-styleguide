import { Component, OnInit } from '@angular/core';
import {ProductOverviewActions} from '../../store/actions';
import {NgRedux, select} from '@angular-redux/store';
import {RootState} from '../../../../support/store/root.reducer';
import {Observable} from 'rxjs';
import {Product} from '../../../../model/product';
import {getProducts} from '../../store/selectors';

@Component({
  selector: 'app-product-overview',
  templateUrl: './product-overview.component.html',
  styleUrls: ['./product-overview.component.css']
})
export class ProductOverviewComponent implements OnInit {

  @select(getProducts)
  products$: Observable<Product[]>;

  constructor(private productActions: ProductOverviewActions, private ngRedux: NgRedux<RootState>) {
  }

  ngOnInit() {
    this.ngRedux.dispatch(this.productActions.loadProductsStart());
  }

}
