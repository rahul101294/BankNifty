import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { HomeProvider } from '../../providers/home/home';
import { Storage } from '@ionic/storage';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the TipCheckoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tip-checkout',
  templateUrl: 'tip-checkout.html',
})
export class TipCheckoutPage {

  currency: string;
  loading: any;
  user_id: any;
  totalAvailableAmount: 0;
  payment_type: boolean;
  tip: any;
  paymentType: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private homeProvider: HomeProvider,
    private globalProvider: GlobalProvider,
    private storage: Storage,
    private userProvider: UserProvider
  ) {
    this.currency = this.globalProvider.currency;

    this.payment_type = false;    
    this.tip = this.navParams.get('tip');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipCheckoutPage');
    this.checkUser();
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;        
        this.tipDetail();
      }
    });
  }

  goToWallet() {
    this.navCtrl.push('WalletPage');
  }

  pay() {
    this.storage.get('userData').then((userData) => {
      if(userData != null) {
        let request = { user_id: userData.id, details: this.tip, paymentType: this.paymentType };
        this.showLoader('Please wait...');
        this.userProvider.tipSubscribe(request).then((result) => {
          this.loading.dismiss();
          this.presentToast(result['message']);
          if(result['status'] == 200) {
            let data = { invoice_id: result['data']['invoice_id']}
            this.navCtrl.setRoot('ThanksPage', data);
          }
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

  checkPayment(payment_type) {
    if(payment_type != '') {
      this.payment_type = true;
      this.paymentType = payment_type;
    } else {
      this.payment_type = false;
    }    
  }

  tipDetail() {
    if(this.tip == undefined) {
      this.navCtrl.setRoot('HomePage');
      return false;
    }
    this.showLoader('Please wait...');
    let requestData = { tip_id: this.tip.tip_id, user_id: this.user_id};
		this.homeProvider.checkOutTipDetail(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.tip = result['data'];
        this.totalAvailableAmount = result['totalAvailableAmount'];
      } else {        
        this.navCtrl.setRoot('HomePage');
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
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
