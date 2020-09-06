import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipCheckoutPage } from './tip-checkout';

@NgModule({
  declarations: [
    TipCheckoutPage,
  ],
  imports: [
    IonicPageModule.forChild(TipCheckoutPage),
  ],
})
export class TipCheckoutPageModule {}
