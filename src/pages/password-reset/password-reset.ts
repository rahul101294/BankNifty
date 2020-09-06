import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the PasswordResetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {

  loading: any;
  private form : FormGroup;
  data = { otp: '', pass:'' };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController,
    private authProvider: AuthProvider
  ) {
    //this.menuCtrl.swipeEnable(false);
    this.form = this.formBuilder.group({
      otp: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

  goToLogin() {
    this.navCtrl.setRoot('LoginPage');
  }

  doResetPassword() {
    this.showLoader('Please wait...');
    let req = { id: this.navParams.get('id'), otp: this.data.otp, pass: this.data.pass };

		this.authProvider.resetPassword(req).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {      
        this.navCtrl.setRoot('LoginPage');
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  resendOtp() {
    let data = { id: this.navParams.get('id') };
    this.showLoader('Please wait...');
		this.authProvider.resendOtp(data).then((result) => {
      this.loading.dismiss();
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
