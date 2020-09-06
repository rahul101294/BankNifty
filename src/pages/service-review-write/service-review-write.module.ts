import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceReviewWritePage } from './service-review-write';
import { StarRatingModule } from 'ionic3-star-rating';

@NgModule({
  declarations: [
    ServiceReviewWritePage,
  ],
  imports: [
    StarRatingModule,
    IonicPageModule.forChild(ServiceReviewWritePage),
  ],
})
export class ServiceReviewWritePageModule {}
