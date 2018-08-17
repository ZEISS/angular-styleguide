import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationInfoComponent } from './components/confirmation-info/confirmation-info.component';
import {ConfirmationRoutingModule} from './confirmation.routing-module';

@NgModule({
  imports: [
    CommonModule,
    ConfirmationRoutingModule
  ],
  declarations: [ConfirmationInfoComponent]
})
export class ConfirmationModule { }
