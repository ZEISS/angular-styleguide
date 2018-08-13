import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ProductOverviewModule} from './product-overview/product-overview.module';
import {NgReduxModule} from '@angular-redux/store';
import {StoreModule} from '../support/store/store.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ProductOverviewModule, NgReduxModule, StoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
