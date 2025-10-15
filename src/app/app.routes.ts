/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Routes } from '@angular/router';
import { ProductDetailComponent } from './catalog/product/components/product-detail/product-detail.component';
import { ProductMasterComponent } from './catalog/product/components/product-master/product-master.component';
import { OrderConfirmationComponent } from './order/components/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'order', component: OrderConfirmationComponent },
  { path: '', component: ProductMasterComponent },
];
