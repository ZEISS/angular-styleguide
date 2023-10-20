/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Routes } from '@angular/router';
import { OrderConfirmationComponent } from '@app/order/components/order-confirmation/order-confirmation.component';

export const orderRoutes: Routes = [{ path: 'order', component: OrderConfirmationComponent }];
