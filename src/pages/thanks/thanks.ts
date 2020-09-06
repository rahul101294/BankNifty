import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ThanksPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-thanks',
  templateUrl: 'thanks.html',
})
export class ThanksPage {

  invoice_id: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.invoice_id = this.navParams.get('invoice_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ThanksPage');
  }

  goToHome() {
    this.navCtrl.setRoot('HomePage');
  }

  goToMyTips() {
    this.navCtrl.setRoot('MyTipsPage');
  }

}
