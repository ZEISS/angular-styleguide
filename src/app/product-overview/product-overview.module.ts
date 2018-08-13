import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import {ProductComponent} from './components/product/product.component';
import {ProductOverviewActions} from './store/actions';
import {ProductOverviewEpics} from './store/epics';
import {ProductServiceService} from './services/product-service.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule, HttpClientModule
  ],
  declarations: [ProductOverviewComponent, ProductComponent],
  exports: [ProductOverviewComponent],
  providers: [ProductOverviewActions, ProductOverviewEpics, ProductServiceService]
})
export class ProductOverviewModule { }
