import { Component, OnInit } from '@angular/core';
import { Product } from '@models/product';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { loadProductDetails, loadProducts } from '@app/product/store/product.actions';
import { selectProducts } from '@app/product/store/product.selectors';

@Component({
  selector: 'app-product-master',
  templateUrl: './product-master.component.html',
  styleUrls: ['./product-master.component.scss'],
})
export class ProductMasterComponent implements OnInit {

  products$: Observable<Product[]> = this.store.select(selectProducts);

  constructor(private store: Store<State>) {
  }

  ngOnInit() {
    this.store.dispatch(loadProducts());
  }

  loadProductDetails(id: number) {
    this.store.dispatch(loadProductDetails({productId: id}));
  }
}
