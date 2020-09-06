import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceCartPage } from './service-cart';

@NgModule({
  declarations: [
    ServiceCartPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceCartPage),
  ],
})
export class ServiceCartPageModule {}
