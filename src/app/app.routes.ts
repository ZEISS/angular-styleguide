/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Routes } from '@angular/router';
import { FeedbackFormComponent } from '@app/shared/components/feedback-form/feedback-form.component';
import { ProductMasterComponent } from '@app/catalog/product/components/product-master/product-master.component';
import { ProductDetailComponent } from '@app/catalog/product/components/product-detail/product-detail.component';
import { OrderConfirmationComponent } from '@app/order/components/order-confirmation/order-confirmation.component';

export const routes: Routes = [
  {
    path: 'feedback-form',
    component: FeedbackFormComponent,
  },
  {
    path: 'product/:id',
    component: ProductDetailComponent,
  },
  {
    path: '',
    component: ProductMasterComponent,
  },
  {
    path: 'order',
    component: OrderConfirmationComponent,
  },
];
