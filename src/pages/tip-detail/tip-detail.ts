import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { GlobalProvider } from '../../providers/global/global';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the TipDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tip-detail',
  templateUrl: 'tip-detail.html',
})
export class TipDetailPage {

  loading: any;
  item: any;
  currency: string;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private userProvider: UserProvider,
    private storage: Storage,
    private globalProvider: GlobalProvider,
    private socialSharing: SocialSharing
  ) {
    this.currency = this.globalProvider.currency;
    this.storage.get('userData').then((userData) => {
      if(userData != null) {
        let tip_id = this.navParams.get('tip_id');
        this.tipDetail(userData, tip_id);
      } else {
        this.storage.remove('userData');
        this.presentToast('Session expire');
        this.navCtrl.setRoot('ChooseOptionPage');
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipDetailPage');
  }

  tipDetail(userData, tip_id) {
    this.showLoader('Please wait...');
    let requestData = { id: tip_id};
		this.userProvider.tipDetail(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.item = result['data'];
      } else {
        this.presentToast(result['message']);
        this.navCtrl.pop();
      }
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  share(item) {
    let message = item.plan_name;
    let subject = 'BANKNIFTY HNI CALLS';
    let file = 'http://hnicalls.com/graph.png';
    let url = 'https://play.google.com/store/apps/details?id=com.hni.calls';
    this.socialSharing.share(message, subject, file, url).then(() => {
      this.presentToast('Plan share successfully');
    }).catch(() => {
      this.presentToast('Please try again');
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
