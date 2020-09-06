import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomeProvider } from '../../providers/home/home';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the SubscriptionPlanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription-plan',
  templateUrl: 'subscription-plan.html',
})
export class SubscriptionPlanPage {

  loading: any;
  data: any;
  currency: string;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private homeProvider: HomeProvider,
    private globalProvider: GlobalProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.currency = this.globalProvider.currency;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionPlanPage');
    this.checkUser();
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.subscriptionPlanData(val.id);
      }
    });
  }

  subscriptionPlanData(id) {
    this.showLoader('Please wait...');
    let requestData = { user_id: id};
		this.homeProvider.subscriptionPlanData(requestData).then((result) => {
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

  goToSubscriptionDetail(plan_id, plan_subscribed) {
    if(plan_subscribed == 'no') {
      let detail = { plan_id: plan_id };
      this.navCtrl.push('SubscriptionDetailPage', detail);
    }    
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
