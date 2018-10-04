import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@models/product';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { switchMap } from 'rxjs/operators';
import { NavigationActions } from '@store/navigation.actions';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductService,
    private navigationActions: NavigationActions) {
  }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getProduct(params.get('id')))
    );
  }

  backToProductOverview() {
    this.navigationActions.dispatch().navigate('/');
  }

  showConfirmation() {
    this.navigationActions.dispatch().navigate('/order');
  }
}
