import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgReduxModule} from '@angular-redux/store';
import {StoreModule} from '../support/store/store.module';
import {AppRoutingModule} from './app.routing-module';
import {OrderModule} from './order/order.module';
import {ProductModule} from './product/product.module';
import {RecommendationsModule} from './product/recommendations/recommendations.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgReduxModule,
    StoreModule,
    ProductModule,
    OrderModule,
    RecommendationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
