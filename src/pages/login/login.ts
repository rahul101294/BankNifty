import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, NavParams, ModalController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthProvider } from '../../providers/auth/auth';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { FCM } from '@ionic-native/fcm';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  loading: any;
  private form : FormGroup;
  data = { user: '', pass:'' };
  device_id: any;
  token: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public modalController: ModalController,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private authProvider: AuthProvider,
    public menuCtrl: MenuController,
    public platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
    private fcm: FCM
  ) {
    this.menuCtrl.swipeEnable(false);
    this.form = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      pass: new FormControl('', [Validators.required])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.platform.ready().then(() => {
      this.uniqueDeviceID.get().then((uuid: any) => {
        this.device_id = uuid;
        console.log(uuid)
      }).catch((error: any) => {
        console.log(error)
      });

		//if(this.platform.is('core')) {
		  this.fcm.getToken().then(token => {
			this.token = token;
		  });
		/*} else {
			this.token = '';
		}*/
    });    
    this.checkUser();
  }

  goToChooseOption() {
    this.navCtrl.setRoot('ChooseOptionPage');
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val != null) {
        this.navCtrl.setRoot('HomePage');
      }
    });
  }

  doLogin() {
    this.showLoader('Please wait...');
    let req = { user: this.data.user, pass: this.data.pass, device_id: this.device_id, token: this.token };

		this.authProvider.login(req).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.storage.set('userData', result['data']);
        this.presentToast('Login Successful');
        this.navCtrl.setRoot('HomePage');
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  goToForgotPassword() {
    this.forgotPaswordModal();
  }

  forgotPaswordModal() {
    const modal = this.modalController.create('ForgotPasswordPage');
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
