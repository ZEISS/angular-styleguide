import { Component, OnInit } from '@angular/core';
import { NavigationActions } from '@store/navigation.actions';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  constructor(private navigationActions: NavigationActions) {
  }

  ngOnInit() {
  }

  backToProductOverview() {
    this.navigationActions.dispatch().navigate('/');
  }

}
