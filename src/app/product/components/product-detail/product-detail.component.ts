import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { switchMap } from 'rxjs/operators';
import { NavigationActions } from '@store/navigation.actions';
import { select } from '@angular-redux/store';
import { getCurrentProductDetail } from '@app/product/store/selectors';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  @select(getCurrentProductDetail)
  product$: Observable<Product>;

  constructor(private navigationActions: NavigationActions) {
  }

  backToProductOverview() {
    this.navigationActions.dispatch().navigate('/');
  }

  showConfirmation() {
    this.navigationActions.dispatch().navigate('/order');
  }
}
