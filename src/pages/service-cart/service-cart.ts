import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { HomeProvider } from '../../providers/home/home';
import { UserProvider } from '../../providers/user/user';

/**
 * Generated class for the ServiceCartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-cart',
  templateUrl: 'service-cart.html',
})
export class ServiceCartPage {

  loading: any;
  currency: string;
  detail: any;
  user_id: any;
  totalAvailableAmount: 0;
  payment_type: boolean;
  paymentType: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalProvider: GlobalProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    private storage: Storage,
    private userProvider: UserProvider,
    private homeProvider: HomeProvider
  ) {
    this.payment_type = false;
    this.currency = this.globalProvider.currency;
    this.detail = this.navParams.get('data');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceCartPage');
    this.checkUser();
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;   
        this.fetchTotalWallet(); 
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

  fetchTotalWallet() {
    this.showLoader('Please wait...');
    let requestData = { user_id: this.user_id};
		this.homeProvider.fetchTotalWallet(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.totalAvailableAmount = result['totalAvailableAmount'];
      } else {
        this.presentToast(result['message']);
        this.navCtrl.setRoot('HomePage');
      }
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  goToWallet() {
    this.navCtrl.push('WalletPage');
  }

  pay() {
    if(this.paymentType == 3) {
      this.storage.get('userData').then((userData) => {
        if(userData != null) {
          let request = { user_id: userData.id, details: this.detail };
          this.showLoader('Please wait...');
          this.userProvider.serviceSubscribe(request).then((result) => {
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
    } else {
      this.presentToast('Something went wrong. Please try again');
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
