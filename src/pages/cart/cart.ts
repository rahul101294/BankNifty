import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { UserProvider } from '../../providers/user/user';
import { HomeProvider } from '../../providers/home/home';
import { GlobalProvider } from '../../providers/global/global';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/** 
 * Generated class for the CartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  data: any;
  price: any;
  plan: any;
  date: Date;
  startDate: any;
  endDate: any;
  currency: string;
  payment_type: boolean;
  subscriptionPlan: any;
  loading: any;
  paymentType: any;
  tip_id: any;
  user_id: any;
  plan_id: any;
  totalAvailableAmount: 0;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public datepipe: DatePipe,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private userProvider: UserProvider,
    private homeProvider: HomeProvider,
    private globalProvider: GlobalProvider,
    private storage: Storage,
    private iab: InAppBrowser
  ) {
    this.currency = this.globalProvider.currency;

    this.payment_type = false;    
    this.plan_id = this.navParams.get('plan_id');
    this.plan = this.navParams.get('plan');   
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CartPage');
    this.checkUser();
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;        
        this.carDetail(this.plan_id, this.plan);
      }
    });
  }

  carDetail(plan_id, plan) {
    this.showLoader('Please wait...');
    let requestData = { plan_id: plan_id, plan: plan, user_id: this.user_id};
		this.homeProvider.carDetail(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.data = result['data'];
        this.totalAvailableAmount = result['totalAvailableAmount'];
        this.calculateDate(plan);
      } else {
        this.presentToast(result['message']);
        this.navCtrl.setRoot('HomePage');
      }
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  calculateDate(plan) {
    this.date = new Date();
    this.startDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');

    this.subscriptionPlan = plan;
    if(plan == 'price_1day') {
      this.date.setDate( this.date.getDate() + 1 );
      this.endDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');
    } else if(plan == 'price_7day') {
      this.date.setDate( this.date.getDate() + 7 );
      this.endDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');
    } else if(plan == 'price_15day') {
      this.date.setDate( this.date.getDate() + 15 );
      this.endDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');
    } else if(plan == 'price_1month') {
      this.date.setMonth( this.date.getMonth() + 1 );
      this.endDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');
    } else if(plan == 'price_3month') {
      this.date.setMonth( this.date.getMonth() + 3 );
      this.endDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');
    } else if(plan == 'price_6month') {
      this.date.setMonth( this.date.getMonth() + 6 );
      this.endDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');
    } else if(plan == 'price_1year') {
      this.date.setFullYear( this.date.getFullYear() + 1 );
      this.endDate = this.datepipe.transform(this.date, 'dd/MM/yyyy');      
    }
  }

  checkPayment(payment_type) {
    if(payment_type != '') {
      this.payment_type = true;
      this.paymentType = payment_type;
    } else {
      this.payment_type = false;
    }    
  }

  pay() {
    if(this.paymentType == 2) {
      this.storage.get('userData').then((userData) => {
        if(userData != null) {
          let request = { user_id: userData.id, details: this.data, plan: this.plan, subscriptionPlan: this.subscriptionPlan, startDate: this.startDate, endDate: this.endDate, paymentType: this.paymentType, tip: this.tip_id };
          this.showLoader('Please wait...');
          this.userProvider.catSubscribe(request).then((result) => {
            this.loading.dismiss();
            //this.presentToast(result['message']);
            if(result['status'] == 200) {
              let data = { invoice_id: result['data']['invoice_id']}
              
              const url = 'https://hnicalls.com/api/payment/?invoice_id='+result['data']['invoice_id'];
              //const target = '_blank';
              //const options = { location : 'no', toolbar: 'no' } ;
              const browser = this.iab.create(url);
              
              browser.on('loadstop').subscribe(event => {
                var url_arr = event.url.split('/');
                var index_success = url_arr.indexOf("success.php");
                var index_error = url_arr.indexOf("failed.php");
                
                if (index_success >= 0) {
                  browser.close();
                  let data = { invoice_id: url_arr[7]}
                  this.navCtrl.setRoot('ThanksPage', data);
                } else if(index_error >= 0) {
                  browser.close();
                  this.navCtrl.setRoot('FailedPage');
                }
              });
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

    } else if(this.paymentType == 1) {
      this.storage.get('userData').then((userData) => {
        if(userData != null) {
          let request = { user_id: userData.id, details: this.data, plan: this.plan, subscriptionPlan: this.subscriptionPlan, startDate: this.startDate, endDate: this.endDate, paymentType: this.paymentType, tip: this.tip_id };
          this.showLoader('Please wait...');
          this.userProvider.catSubscribe(request).then((result) => {
            this.loading.dismiss();
            //this.presentToast(result['message']);
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
    } else if(this.paymentType == 3) {
      this.storage.get('userData').then((userData) => {
        if(userData != null) {
          let request = { user_id: userData.id, details: this.data, plan: this.plan, subscriptionPlan: this.subscriptionPlan, startDate: this.startDate, endDate: this.endDate, paymentType: this.paymentType };
          this.showLoader('Please wait...');
          this.userProvider.catSubscribe(request).then((result) => {
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

  goToWallet() {
    this.navCtrl.push('WalletPage');
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
