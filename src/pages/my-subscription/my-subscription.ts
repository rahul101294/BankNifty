import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the MySubscriptionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-subscription',
  templateUrl: 'my-subscription.html',
})
export class MySubscriptionPage {

  loading: any;
  data: any;
  currency: string;
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
      if(userData != null) {
        this.mySubscriptions(userData);
      } else {
        this.storage.remove('userData');
        this.presentToast('Session expire');
        this.navCtrl.setRoot('ChooseOptionPage');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MySubscriptionPage');
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.data = [];
      this.storage.get('userData').then((userData) => {
      if(userData != null) {
        this.mySubscriptions(userData);
      } else {
        this.storage.remove('userData');
        this.presentToast('Session expire');
        this.navCtrl.setRoot('ChooseOptionPage');
      }
    });
      event.complete();
    }, 2000);
  }

  mySubscriptions(userData) {
    this.showLoader('Please wait...');
    let requestData = { id: userData.id};
		this.userProvider.mySubscriptions(requestData).then((result) => {
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

  goToSubscriptionPlan() {
    this.navCtrl.setRoot('SubscriptionPlanPage');
  }

  renewPlan(key) {
    let params = { plan_id: this.data[key].plan_id, plan: this.data[key].plan_type };
    console.log(params);
    this.navCtrl.push('CartPage', params);
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
