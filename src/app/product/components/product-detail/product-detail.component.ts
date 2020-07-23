import { Component } from '@angular/core';
import { Product } from '@models/product';
import { NavigationActions } from '@store/navigation.actions';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '@app/reducers';
import { selectCurrentProductDetails } from '@app/product/product.selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {

  product$: Observable<Product> = this.store.select(selectCurrentProductDetails);

  constructor(private navigationActions: NavigationActions, private store: Store<State>) {
  }

  backToProductOverview() {
    this.navigationActions.dispatch().navigate('/');
  }

  showConfirmation() {
    this.navigationActions.dispatch().navigate('/order');
  }
}
