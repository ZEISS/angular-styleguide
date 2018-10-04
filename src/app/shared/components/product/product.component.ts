import {Component, Input} from '@angular/core';
import {Product} from '@models/product';
import {NavigationActions} from '@store/navigation.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product;

  constructor(private navigationActions: NavigationActions) { }

  showProduct(productId: number) {
    this.navigationActions.dispatch().navigate(`/product/${productId}`);
  }
}
