import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { State } from '@app/reducers';
import { selectCurrentProductDetails } from '@app/product/store/product.selectors';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { Product } from '@models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {

  product$: Observable<Product> = this.store.select(selectCurrentProductDetails);

  constructor(private store: Store<State>) {
  }

  backToProductOverview() {
    this.store.dispatch(navigate({url: '/'}));
  }

  showConfirmation() {
    this.store.dispatch(navigate({url: '/order'}));
  }
}
