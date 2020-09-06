import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { HomeProvider } from '../../providers/home/home';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the SubscriptionDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subscription-detail',
  templateUrl: 'subscription-detail.html',
})
export class SubscriptionDetailPage {

  loading: any;
  data: any;
  currency: string;
  price: any;
  plan: any;
  description: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private homeProvider: HomeProvider,
    private globalProvider: GlobalProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController
  ) {
    this.currency = this.globalProvider.currency;
    let plan_id = this.navParams.get('plan_id');
    this.subscriptionPlanDetail(plan_id);
    this.plan = 'price_1month';
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SubscriptionDetailPage');
  }

  subscriptionPlanDetail(plan_id) {
    this.showLoader('Please wait...');
    let requestData = { plan_id: plan_id};
		this.homeProvider.subscriptionPlanDetail(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.data = result['data'];
        this.description = this.data.description;
        this.price = this.data.price_1month;
      } else {
        this.presentToast(result['message']);
        this.navCtrl.setRoot('SubscriptionPlanPage');
      }
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }
  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}
  changePlan(plan) {
    this.plan = plan;
    if(plan == 'price_1day') {
      this.price = this.data.price_1day;
    } else if(plan == 'price_7day') {
      this.price = this.data.price_7day;
    } else if(plan == 'price_15day') {
      this.price = this.data.price_15day;
    } else if(plan == 'price_1month') {
      this.price = this.data.price_1month;
    } else if(plan == 'price_3month') {
      this.price = this.data.price_3month;
    } else if(plan == 'price_6month') {
      this.price = this.data.price_6month;
    } else if(plan == 'price_1year') {
      this.price = this.data.price_1year;
    }
  }

  subscribe(plan_id, plan) {
    let detail = { plan_id: plan_id, plan: plan, tip: 'No' };
    this.navCtrl.push('CartPage', detail);
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
