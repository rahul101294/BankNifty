import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  loading: any;
  private form : FormGroup;
  data = { phone: '', email: '', full_name: '', investment_capital: '', pass:'', termsAccepted: '' };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public toastController: ToastController,
    private storage: Storage,
    private authProvider: AuthProvider,
    public loadingCtrl: LoadingController,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.swipeEnable(false);
    this.form = this.formBuilder.group({
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      full_name: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required]),
      investment_capital: new FormControl('', [Validators.required]),
      termsAccepted: new FormControl(null, [Validators.required])
    });
    this.data.investment_capital = '10 K';
    this.data.termsAccepted = null;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
    this.checkUser();
  }

  onTermsChecked($event)
  {
      if ( ! $event.checked)
      {
          this.form.patchValue({ termsAccepted: null });
      }
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val != null) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  goToChooseOption() {
    this.navCtrl.setRoot('ChooseOptionPage');
  }

  doRegister() {
    this.showLoader('Please wait...');
		this.authProvider.register(this.data).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        let params = { id: result['data']['id'] };
        this.navCtrl.setRoot('OtpPage', params);
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
