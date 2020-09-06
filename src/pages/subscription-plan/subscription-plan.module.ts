import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SubscriptionPlanPage } from './subscription-plan';

@NgModule({
  declarations: [
    SubscriptionPlanPage,
  ],
  imports: [
    IonicPageModule.forChild(SubscriptionPlanPage),
  ],
})
export class SubscriptionPlanPageModule {}
