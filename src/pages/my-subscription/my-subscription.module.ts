import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MySubscriptionPage } from './my-subscription';

@NgModule({
  declarations: [
    MySubscriptionPage,
  ],
  imports: [
    IonicPageModule.forChild(MySubscriptionPage),
  ],
})
export class MySubscriptionPageModule {}
