import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {Product} from '../../../../model/product';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {ProductService} from '../../services/product.service';
import {switchMap} from 'rxjs/operators';
import {RootState} from '../../../../support/store/root.reducer';
import {NavigationActions} from '../../../../support/store/navigation.actions';
import {NgRedux} from '@angular-redux/store';

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
    private ngRedux: NgRedux<RootState>,
    private navigationActions: NavigationActions) {
  }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getProduct(params.get('id')))
    );
  }

  backToProductOverview() {
    this.ngRedux.dispatch(this.navigationActions.navigate('/'));
  }

  showConfirmation() {
    this.ngRedux.dispatch(this.navigationActions.navigate('/order'));
  }
}
