import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the ServiceDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-detail',
  templateUrl: 'service-detail.html',
})
export class ServiceDetailPage {

  loading: any;
  currency: string;
  serviceDetail: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private globalProvider: GlobalProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public platform: Platform
  ) {
    this.currency = this.globalProvider.currency;
    this.serviceDetail = this.navParams.get('data');  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceDetailPage');
  }

  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
  }

  goToServiceCart(details) {
    let detail = { data: details };
    this.navCtrl.push('ServiceCartPage', detail);
  }

  viewServiceRatings(serviceId, subsciption_id) {
    let detail = { serviceId: serviceId, subsciption_id: subsciption_id };
    this.navCtrl.push('ServiceReviewsPage', detail);
  }

  viewServiceContent(serviceId, subsciption_id) {
    let detail = { serviceId: serviceId, subsciption_id: subsciption_id };
    this.navCtrl.push('ServiceContentPage', detail);
  }
}
