import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductOverviewComponent} from './product-overview/components/product-overview/product-overview.component';

const appRoutes: Routes = [
  // {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
