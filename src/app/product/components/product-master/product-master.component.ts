import { select } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product';
import { Observable } from 'rxjs';
import { ProductActions } from '../../store/actions';
import { getProducts } from '../../store/selectors';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss'],
})
export class ProductMasterComponent implements OnInit {

  @select(getProducts)
  public products$: Observable<Product[]>;

  constructor(private productActions: ProductActions) {
  }

  public ngOnInit() {
    this.productActions.dispatch().startLoadProducts();
  }

  public loadProductDetails(id: number) {
    this.productActions.dispatch().startLoadProductDetails(id);
  }
}
