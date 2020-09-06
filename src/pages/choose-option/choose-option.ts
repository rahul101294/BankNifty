import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ChooseOptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-choose-option',
  templateUrl: 'choose-option.html',
})
export class ChooseOptionPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private storage: Storage,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.swipeEnable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseOptionPage');
    this.checkUser();
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val != null) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  goToLogin() {
    this.navCtrl.push('LoginPage');
  }

  goToRegister() {
    this.navCtrl.push('RegisterPage');
  }

}
