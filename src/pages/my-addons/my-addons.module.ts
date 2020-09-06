import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAddonsPage } from './my-addons';

@NgModule({
  declarations: [
    MyAddonsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAddonsPage),
  ],
})
export class MyAddonsPageModule {}
