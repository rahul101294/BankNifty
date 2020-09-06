import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { GlobalProvider } from '../../providers/global/global';
import { InAppBrowser } from '@ionic-native/in-app-browser';

/**
 * Generated class for the WalletStatementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-wallet-statement',
  templateUrl: 'wallet-statement.html',
})
export class WalletStatementPage {

  loading: any;
  form : FormGroup;
  data = { amount: '' };
  totalAvailableAmount: 0;
  walletHistory: any = [];
  page: any = 1;
  noMorePage: any = false;
  user_id: any;
  currency: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
    private storage: Storage,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private globalProvider: GlobalProvider
  ) {
    this.currency = this.globalProvider.currency;
    this.checkUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalletStatementPage');
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
