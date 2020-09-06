import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipDetailPage } from './tip-detail';

@NgModule({
  declarations: [
    TipDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(TipDetailPage),
  ],
})
export class TipDetailPageModule {}
