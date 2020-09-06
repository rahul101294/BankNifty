import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ToastController, ModalController, LoadingController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomeProvider } from '../../providers/home/home';

/**
 * Generated class for the ServiceReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-reviews',
  templateUrl: 'service-reviews.html',
})
export class ServiceReviewsPage {

  loading: any;
  subsciption_id: any;
  serviceId: any;
  page: any = 1;
  noMorePage: any = false;
  data: any = [];
  user_id: any;
  review: any = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private homeProvider: HomeProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform,
    public modalController: ModalController,
    public menuCtrl: MenuController
  ) {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;
        this.servicesReviewsData(null);
      }
    });
    this.serviceId = this.navParams.get('serviceId');
    this.subsciption_id = this.navParams.get('subsciption_id');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceReviewsPage');    
  }

  async doRefresh(event) {
    setTimeout(() => {
      this.data = [];
      this.page = 1;
      this.servicesReviewsData(null);
      event.complete();
    }, 2000);
  }

  servicesReviewsData(infiniteScroll) {
    if(this.page == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { subsciption_id: this.subsciption_id, serviceId: this.serviceId, 'page':this.page, 'user_id': this.user_id};
		this.homeProvider.servicesReviews(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        if(this.review == false) {
          this.review = result['review'];
        }
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

  writeReview() {
    let detail = { subsciption_id: this.subsciption_id, serviceId: this.serviceId };
    const modal = this.modalController.create('ServiceReviewWritePage', detail);
    modal.present();
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
