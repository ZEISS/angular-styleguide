/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/reducers';
import { navigate } from '@app/shared/navigation/navigation.actions';
import { ActivatedRoute, Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { ProductWithCount } from '@models/product';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  imports: [ThemeSwitcherComponent, ReactiveFormsModule],
})
export class OrderConfirmationComponent {
  public purchasedProducts: ProductWithCount[] = [];

  constructor(
    private store: Store<AppState>,
    public router: Router,
  ) {
    this.purchasedProducts = this.router.currentNavigation()?.extras?.state?.products;
  }

  backToProductOverview() {
    this.store.dispatch(navigate({ url: '/' }));
  }
}
