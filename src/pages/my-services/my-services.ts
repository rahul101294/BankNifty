import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomeProvider } from '../../providers/home/home';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the MyServicesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-services',
  templateUrl: 'my-services.html',
})
export class MyServicesPage {

  loading: any;
  data: any = [];
  currency: string;
  pageService: any = 1;
  noMorePageService: any = false;
  user_id: any;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private homeProvider: HomeProvider,
    private globalProvider: GlobalProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform
  ) {
    this.currency = this.globalProvider.currency;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyServicesPage');
    this.checkUser();
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;
        this.myServices(null);    
      }
    });
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.data = [];
      this.pageService = 1;
      this.myServices(null);
      event.complete();
    }, 2000);
  }

  myServices(infiniteScroll) {
    if(this.pageService == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { user_id: this.user_id,'page':this.pageService};
		this.homeProvider.myServices(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.data = this.data.concat(result['data']);
        if(result['data'].length > 0) {
          this.pageService++;
          if(infiniteScroll != null) {
            infiniteScroll.complete();
          }
          this.noMorePageService = result['data'].length < 5 ? true :false;
        } else {
          this.noMorePageService = true;
        }
      } else if(result['status'] == 403) {
        this.presentToast(result['message']);
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.noMorePageService = true;
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  goToServiceDetail(item) {
    let params = { data: item };
    this.navCtrl.push('ServiceDetailPage', params);
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
