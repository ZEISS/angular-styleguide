import { Component, OnInit } from '@angular/core';
import {NgRedux, select} from '@angular-redux/store';
import {getProducts} from '../../store/selectors';
import {Observable} from 'rxjs';
import {Product} from '../../../../model/product';
import {ProductActions} from '../../store/actions';
import {RootState} from '../../../../support/store/root.reducer';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.css']
})
export class ProductMasterComponent implements OnInit {

  @select(getProducts)
  products$: Observable<Product[]>;

  constructor(private productActions: ProductActions, private ngRedux: NgRedux<RootState>) {
  }

  ngOnInit() {
    this.ngRedux.dispatch(this.productActions.loadProductsStart());
  }

}
