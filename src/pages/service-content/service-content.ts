import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomeProvider } from '../../providers/home/home';

/**
 * Generated class for the ServiceContentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-content',
  templateUrl: 'service-content.html',
})
export class ServiceContentPage {

  loading: any;
  subsciption_id: any;
  serviceId: any;
  page: any = 1;
  noMorePage: any = false;
  data: any = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private homeProvider: HomeProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public menuCtrl: MenuController
  ) {
    this.serviceId = this.navParams.get('serviceId');
    this.subsciption_id = this.navParams.get('subsciption_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceContentPage');
    this.servicesContentData(null);
  }

  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  servicesContentData(infiniteScroll) {
    if(this.page == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { subsciption_id: this.subsciption_id, serviceId: this.serviceId,'page':this.page};
		this.homeProvider.serviceContent(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.data = this.data.concat(result['data']);
        if(result['data'].length > 0) {
          this.page++;
          if(infiniteScroll != null) {
            infiniteScroll.complete();
          }
          this.noMorePage = result['data'].length < 5 ? true :false;
        } else {
          this.noMorePage = true;
        }
      } else if(result['status'] == 403) {
        this.presentToast(result['message']);
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.noMorePage = true;
        this.presentToast("No More Data Found");
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
