import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {ProductServiceService} from '../../../product-overview/services/product-service.service';
import {Observable} from 'rxjs';
import {Product} from '../../../../model/product';

@Component({
  selector: 'app-product-description',
  templateUrl: './product-description.component.html',
  styleUrls: ['./product-description.component.css']
})
export class ProductDescriptionComponent implements OnInit {
    product$: Observable<Product>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProductServiceService
  ) {
  }

  ngOnInit() {
    this.product$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.service.getProduct(params.get('id')))
    );
  }

  backToProductOverview() {
    this.router.navigate(['']);
  }

}
