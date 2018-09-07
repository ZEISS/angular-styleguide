import {Component, Input} from '@angular/core';
import {Product} from '../../../../model/product';
import {RootState} from '../../../../support/store/root.reducer';
import {NgRedux} from '@angular-redux/store';
import {NavigationActions} from '../../../../support/store/navigation.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {

  @Input() product: Product;
  constructor(private ngRedux: NgRedux<RootState>, private navigationActions: NavigationActions) { }

  showProduct(productId: number) {
    this.ngRedux.dispatch(this.navigationActions.navigate(`/product/${productId}`));
  }
}
