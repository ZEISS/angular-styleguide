/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

import { AppState } from '@app/reducers';
import { Router } from '@angular/router';
import { ThemeSwitcherComponent } from '@app/shared/components/theme/theme-switcher.component';
import { ProductWithCount } from '@models/product';
import { ReactiveFormsModule } from '@angular/forms';
import { BackToAllProductsComponent } from '@app/shared/components/back-to-all-products/back-to-all-products.component';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { navigate } from '@app/shared/navigation/navigation.actions';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss'],
  imports: [
    ThemeSwitcherComponent,
    ReactiveFormsModule,
    BackToAllProductsComponent,
    FaIconComponent,
  ],
})
export class OrderConfirmationComponent {
  public purchasedProducts: ProductWithCount[] = [];
  protected readonly faComment = faComment;

  constructor(
    private store: Store<AppState>,
    public router: Router,
  ) {
    this.purchasedProducts = this.router.currentNavigation()?.extras?.state?.products;
  }

  public navigateToFeedback(): void {
    this.store.dispatch(navigate({ url: '/feedback-form' }));
  }
}
