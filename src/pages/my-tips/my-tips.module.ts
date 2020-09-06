import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyTipsPage } from './my-tips';

@NgModule({
  declarations: [
    MyTipsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyTipsPage),
  ],
})
export class MyTipsPageModule {}
