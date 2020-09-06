import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageDetailPage } from './page-detail';

@NgModule({
  declarations: [
    PageDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(PageDetailPage),
  ],
})
export class PageDetailPageModule {}
