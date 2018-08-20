import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductOverviewComponent } from './components/product-overview/product-overview.component';
import {ProductOverviewActions} from './store/actions';
import {ProductOverviewEpics} from './store/epics';
import {ProductServiceService} from './services/product-service.service';
import {HttpClientModule} from '@angular/common/http';
import {ProductOverviewRoutingModule} from './product-overview.routing-module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductOverviewRoutingModule,
    SharedModule
  ],
  declarations: [
    ProductOverviewComponent
  ],
  exports: [
    ProductOverviewComponent
  ],
  providers: [
    ProductOverviewActions,
    ProductOverviewEpics,
    ProductServiceService
  ]
})
export class ProductOverviewModule { }
