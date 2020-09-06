import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FailedPage } from './failed';

@NgModule({
  declarations: [
    FailedPage,
  ],
  imports: [
    IonicPageModule.forChild(FailedPage),
  ],
})
export class FailedPageModule {}
