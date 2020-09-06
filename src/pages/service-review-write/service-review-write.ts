import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { HomeProvider } from '../../providers/home/home';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ServiceReviewWritePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-service-review-write',
  templateUrl: 'service-review-write.html',
})
export class ServiceReviewWritePage {

  private form : FormGroup;
  data = { starRating: '', content: '' };
  loading: any;
  user_id: any;
  subsciption_id: any;
  serviceId: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    private homeProvider: HomeProvider,
    public toastController: ToastController,
    private storage: Storage
  ) {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;
      }
    });
    this.subsciption_id = this.navParams.get('subsciption_id');
    this.serviceId = this.navParams.get('serviceId');
    this.form = this.formBuilder.group({
      content: new FormControl('', [Validators.required]),
      starRating: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ServiceReviewWritePage');
  }

  logRatingChange(rating) {
    //console.log("changed rating: ",rating);
    // do your stuff
  }

  doWriteReview() {
    this.showLoader('Please wait...');
    
		let req = { rating: this.data.starRating, content: this.data.content, subsciption_id: this.subsciption_id, serviceId: this.serviceId, user_id: this.user_id };

		this.homeProvider.servicesReviewWrite(req).then((result) => {
			this.loading.dismiss();
			if(result['status'] == 200) {				
        this.navCtrl.pop();			
			}			
			this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
    
	}

  close() {
    this.navCtrl.pop();
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
