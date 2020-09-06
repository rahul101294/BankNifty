import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceContentPage } from './service-content';

@NgModule({
  declarations: [
    ServiceContentPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceContentPage),
  ],
})
export class ServiceContentPageModule {}
