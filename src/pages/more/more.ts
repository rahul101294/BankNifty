import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the MorePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-more',
  templateUrl: 'more.html',
})
export class MorePage {

  loading: any;
  items: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private globalProvider: GlobalProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MorePage');
    this.pagesList();
  }

  pagesList() {
    this.showLoader('Please wait...');
		this.globalProvider.pagesList().then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.items = result['data'];
      } else {
        this.presentToast(result['message']);
        this.navCtrl.pop();
      }
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  goToPage(slug) {
    let parmas = { slug: slug };
    this.navCtrl.push('PageDetailPage', parmas);
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
