/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '@app/reducers';
import { navigate } from '@app/shared/navigation/navigation.actions';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
})
export class OrderConfirmationComponent {
  constructor(private store: Store<State>) {}

  backToProductOverview() {
    this.store.dispatch(navigate({ url: '/' }));
  }
}
