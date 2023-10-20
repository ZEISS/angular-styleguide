/*
 * SPDX-FileCopyrightText: (c) 2023 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { Routes } from '@angular/router';
import { orderRoutes } from '@app/order/order.routes';

export const routes: Routes = [
  {
    path: '',
    children: orderRoutes,
  },
];
