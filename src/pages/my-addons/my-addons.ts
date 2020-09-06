import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the MyAddonsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-addons',
  templateUrl: 'my-addons.html',
})
export class MyAddonsPage {

  loading: any;
  data: any;
  currency: string;
  userData: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private userProvider: UserProvider,
    private storage: Storage,
    private globalProvider: GlobalProvider
  ) {
    this.currency = this.globalProvider.currency;
    this.storage.get('userData').then((userData) => {
      this.userData = userData;
      if(userData != null) {
        this.myAddons(this.userData);
      } else {
        this.storage.remove('userData');
        this.presentToast('Session expire');
        this.navCtrl.setRoot('ChooseOptionPage');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyAddonsPage');
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.myAddons(this.userData);
      event.complete();
    }, 2000);
  }

  goToSubscriptionPlan() {
    this.navCtrl.setRoot('HomePage');
  }

  myAddons(userData) {
    this.showLoader('Please wait...');
    let requestData = { id: userData.id};
		this.userProvider.myAddons(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.data = result['data'];
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  goToTipDetail(id) {
    let params = { tip_id: id };
    this.navCtrl.push('TipDetailPage', params);
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
