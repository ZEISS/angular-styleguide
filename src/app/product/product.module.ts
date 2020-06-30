import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductMasterComponent } from './components/product-master/product-master.component';
import { ProductRoutingModule } from './product.routing-module';
import { RecommendationsModule } from './recommendations/recommendations.module';
import { ProductService } from './services/product.service';
import { ProductActions } from './store/actions';
import { ProductEpics } from './store/epics';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    ProductRoutingModule,
    RecommendationsModule,
    SharedModule,
  ],
  declarations: [
    ProductDetailComponent,
    ProductMasterComponent,
  ],
  exports: [
    ProductDetailComponent,
    ProductMasterComponent,
  ],
  providers: [
    ProductActions,
    ProductEpics,
    ProductService,
  ],
})
export class ProductModule {
}
