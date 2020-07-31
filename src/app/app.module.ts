import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { StoreModule } from '@store/store.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing-module';
import { OrderModule } from './order/order.module';
import { ProductModule } from './product/product.module';
import { RecommendationsModule } from './product/recommendations/recommendations.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    StoreModule,
    ProductModule,
    OrderModule,
    RecommendationsModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
