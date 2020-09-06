import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionDetailPage } from './subscription-detail';

@NgModule({
  declarations: [
    SubscriptionDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptionDetailPage),
  ],
})
export class SubscriptionDetailPageModule {}
