import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '@app/reducers';
import { navigate } from '@app/shared/navigation/navigation.actions';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css'],
})
export class OrderConfirmationComponent {
  constructor(private store: Store<State>) {}

  backToProductOverview() {
    this.store.dispatch(navigate({ url: '/' }));
  }
}
