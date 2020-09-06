import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  private form : FormGroup;
  data = { phone: '' };
  loading: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
	public loadingCtrl: LoadingController,
	private authProvider: AuthProvider,
    public toastController: ToastController
  ) {
    this.form = this.formBuilder.group({
      phone: new FormControl('', [Validators.required]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

	doForgotPassword() {
		this.showLoader('Please wait...');
		let req = { data: this.data };

		this.authProvider.forgotPasswordByMobile(req).then((result) => {
			this.loading.dismiss();
			if(result['status'] == 200) {				
        this.navCtrl.pop();
        let params = { id: result['data']['id'] };
        this.navCtrl.setRoot('PasswordResetPage', params);			
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
