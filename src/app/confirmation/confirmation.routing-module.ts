import {ConfirmationInfoComponent} from './components/confirmation-info/confirmation-info.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: 'confirmation', component: ConfirmationInfoComponent}

];

@NgModule({
  imports: [
    RouterModule.forChild(
      routes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class ConfirmationRoutingModule {}


