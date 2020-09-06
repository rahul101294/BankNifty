import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { GlobalProvider } from '../../providers/global/global';

/**
 * Generated class for the PageDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-detail',
  templateUrl: 'page-detail.html',
})
export class PageDetailPage {

  loading: any;
  title: any;
  description: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private globalProvider: GlobalProvider
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PageDetailPage');
    let slug = this.navParams.get('slug');
    if(slug != '') {
      this.pageDetail(slug);
    } else {
      this.presentToast('Invalid action');
      this.navCtrl.pop();
    }  
  }

  pageDetail(slug) {
    this.showLoader('Please wait...');
    let requestData = { slug: slug };
		this.globalProvider.pageDetail(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.title = result['data'].title;
        this.description = result['data'].description;
      } else {
        this.presentToast(result['message']);
        this.navCtrl.pop();
      }
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  toHTML(input) : any {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
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
