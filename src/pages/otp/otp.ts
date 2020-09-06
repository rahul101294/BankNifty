import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  loading: any;
  private form : FormGroup;
  data = { otp1: '', otp2:'', otp3: '', otp4: '', otp5: '', otp6: '' };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastController: ToastController,
    private storage: Storage,
    public loadingCtrl: LoadingController,
    private authProvider: AuthProvider,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.swipeEnable(false);
    this.form = this.formBuilder.group({
      otp1: new FormControl('', [Validators.required]),
      otp2: new FormControl('', [Validators.required]),
      otp3: new FormControl('', [Validators.required]),
      otp4: new FormControl('', [Validators.required]),
      otp5: new FormControl('', [Validators.required]),
      otp6: new FormControl('', [Validators.required])      
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
    this.checkUser();
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val != null) {
        this.navCtrl.setRoot('HomePage');
      } else {
        if(this.navParams.get('id') == undefined) {
          this.navCtrl.setRoot('ChooseOptionPage');
        }
      }
    });
  }

  doVerifyOtp() {
    let data = { id: this.navParams.get('id'), otp: this.data.otp1+this.data.otp2+this.data.otp3+this.data.otp4+this.data.otp5+this.data.otp6 };
    this.showLoader('Please wait...');
		this.authProvider.verifyOtp(data).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.presentToast(result['message']);
        this.navCtrl.setRoot('LoginPage');
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  next(e) {
    e.setFocus();
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
