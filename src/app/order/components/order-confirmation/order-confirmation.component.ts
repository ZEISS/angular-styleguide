/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
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
  public router = inject(Router);

  public purchasedProducts: ProductWithCount[] = [];

  constructor() {
    this.purchasedProducts = this.router.currentNavigation()?.extras?.state?.products;
  }

  backToProductOverview() {
    this.router.navigateByUrl('/');
  }
}
