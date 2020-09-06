import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChooseOptionPage } from './choose-option';

@NgModule({
  declarations: [
    ChooseOptionPage,
  ],
  imports: [
    IonicPageModule.forChild(ChooseOptionPage),
  ],
})
export class ChooseOptionPageModule {}
