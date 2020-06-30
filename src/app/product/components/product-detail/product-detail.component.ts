import { select } from '@angular-redux/store';
import { Component } from '@angular/core';
import { getCurrentProductDetail } from '@app/product/store/selectors';
import { Product } from '@models/product';
import { NavigationActions } from '@store/navigation.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {

  @select(getCurrentProductDetail)
  public product$: Observable<Product>;

  constructor(private navigationActions: NavigationActions) {
  }

  public backToProductOverview() {
    this.navigationActions.dispatch().navigate('/');
  }

  public showConfirmation() {
    this.navigationActions.dispatch().navigate('/order');
  }
}
