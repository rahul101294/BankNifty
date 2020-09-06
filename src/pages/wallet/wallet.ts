import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the WalletPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet',
  templateUrl: 'wallet.html',
})
export class WalletPage {

  loading: any;
  form : FormGroup;
  data = { amount: '' };
  totalAvailableAmount: 0;
  walletHistory: any = [];
  page: any = 1;
  noMorePage: any = false;
  user_id: any;
  currency: string;
  lastTransaction: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
    private storage: Storage,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    private globalProvider: GlobalProvider,
    private iab: InAppBrowser
  ) {
    this.currency = this.globalProvider.currency;
    this.form = formBuilder.group({
      amount: ['', Validators.compose([Validators.required])]
    });
    this.checkUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletPage');
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;
        this.fetchPaymentHistory(null)
      }
    });
  }

  doAddAmount() {
    this.storage.get('userData').then((val) => {
      if(val != null) {
        this.showLoader('Please wait...');
        this.data['id'] = val.id;
        this.userProvider.addAmount(this.data).then((result) => {
          this.loading.dismiss();
          this.presentToast(result['message']);
          if(result['status'] == 200) {
            let data = { invoice_id: result['data']['invoice_id']}
            
            const url = 'https://hnicalls.com/api/v3/payment/?invoice_id='+result['data']['invoice_id'];
            //const target = '_blank';
            //const options = { location : 'no', toolbar: 'no' } ;
            const browser = this.iab.create(url);
            
            browser.on('loadstop').subscribe(event => {
              var url_arr = event.url.split('/');
              var index_success = url_arr.indexOf("success.php");
              var index_error = url_arr.indexOf("failed.php");
                            
              if (index_success >= 0) {    
                browser.close();
                this.form.reset();
                this.presentToast("Payment Successful");
                this.fetchPaymentHistory(null);   
              } else if(index_error >= 0) {
                browser.close();                
                this.presentToast("Payment Failed");
              }
            });
          }
        }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
        });
      } else {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
        this.presentToast("Invalid user");
      }
    });
  }

  fetchPaymentHistory(infiniteScroll) {
    if(this.page == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { user_id: this.user_id, 'page':this.page};
		this.userProvider.walletHistory(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.totalAvailableAmount = result['totalAvailableAmount'];
        this.walletHistory = this.walletHistory.concat(result['data']);
        if(result['data'].length > 0) {
          if(this.page == 1) {
            this.lastTransaction = result['lastTransaction'];
          }
          this.page++;
          if(infiniteScroll != null) {
            infiniteScroll.complete();
          }
          this.noMorePage = result['data'].length < 20 ? true :false;
        } else {
          this.noMorePage = true;
        }
      } else if(result['status'] == 403) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.noMorePage = true;
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  goToWalletStatement() {
    this.navCtrl.push('WalletStatementPage');
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
