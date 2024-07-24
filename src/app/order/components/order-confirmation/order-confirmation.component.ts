/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { State } from '@app/reducers';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { ProductInCart } from '@models/product';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  imports: [AsyncPipe, NgIf, ThemeSwitcherComponent, NgForOf, ReactiveFormsModule],
})
export class OrderConfirmationComponent {
  constructor(
    private store: Store<State>,
    public router: Router,
  ) {
    this.purchasedProducts = this.router.getCurrentNavigation()?.extras?.state?.products;
  }

  public purchasedProducts: ProductInCart[] = [];

  backToProductOverview() {
    this.store.dispatch(navigate({ url: '/' }));
  }
}
