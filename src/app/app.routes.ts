/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Routes } from '@angular/router';
import { orderRoutes } from '@app/order/order.routes';
import { ProductDetailComponent } from './catalog/product/components/product-detail/product-detail.component';
import { ProductMasterComponent } from './catalog/product/components/product-master/product-master.component';

export const routes: Routes = [
  { path: 'product/:id', component: ProductDetailComponent },
  { path: '', component: ProductMasterComponent, children: orderRoutes },
];
