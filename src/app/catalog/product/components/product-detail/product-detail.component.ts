import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import { selectCurrentProductDetails } from '@app/catalog/product/store/product.selectors';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { StateWithCatalog } from '@app/catalog/store/catalog.reducer';
import { Product } from '@models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  product$ = this.store.select(selectCurrentProductDetails);

  constructor(private store: Store<StateWithCatalog>) {}

  backToProductOverview() {
    this.store.dispatch(navigate({ url: '/' }));
  }

  showConfirmation() {
    this.store.dispatch(navigate({ url: '/order' }));
  }
}
