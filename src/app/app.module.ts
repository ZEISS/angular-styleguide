/*
 * SPDX-FileCopyrightText: (c) 2022 Carl Zeiss AG
 * SPDX-License-Identifier: MIT
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@store/store.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { CatalogModule } from './catalog/catalog.module';
import { OrderModule } from './order/order.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, StoreModule, CatalogModule, OrderModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
