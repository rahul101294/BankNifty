import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  loading: any;
  notification: boolean;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private userProvider: UserProvider,
    private storage: Storage
  ) {
    this.notification = false;
    this.storage.get('userData').then((userData) => {
      if(userData != null) {
        this.notification = userData.notification;
      } else {
        this.storage.remove('userData');
        this.presentToast('Session expire');
        this.navCtrl.setRoot('ChooseOptionPage');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  changeNotificationSetting(notification) {
    this.storage.get('userData').then((userData) => {
      if(userData != null) {
        let request = { user_id: userData.id, notification: notification };
        this.showLoader('Please wait...');
        this.userProvider.changeNotification(request).then((result) => {
          this.loading.dismiss();
          userData.notification = notification;
          this.storage.set('userData', userData);
          this.presentToast(result['message']);          
        }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
        });
      } else {
        this.storage.remove('userData');
        this.presentToast('Session expire');
        this.navCtrl.setRoot('ChooseOptionPage');
      }
    });
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  showLoader(msg) {
    this.loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: msg
    });
    this.loading.present();
  }

}
