import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalletStatementPage } from './wallet-statement';

@NgModule({
  declarations: [
    WalletStatementPage,
  ],
  imports: [
    IonicPageModule.forChild(WalletStatementPage),
  ],
})
export class WalletStatementPageModule {}
