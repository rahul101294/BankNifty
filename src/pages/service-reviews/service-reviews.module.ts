import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceReviewsPage } from './service-reviews';

@NgModule({
  declarations: [
    ServiceReviewsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceReviewsPage),
  ],
})
export class ServiceReviewsPageModule {}
