import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ProductOverviewModule} from './product-overview/product-overview.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule, ProductOverviewModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
