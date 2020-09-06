import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

/**
 * Generated class for the ChangePasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  loading: any;
  form : FormGroup;
  data = { old_password: '', password:'', confirm_password: '' };
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
    private storage: Storage,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder
  ) {
    this.form = formBuilder.group({
                    old_password: ['', Validators.compose([Validators.required])],
                    password: ['', Validators.compose([Validators.required])],
                    confirm_password: ['', Validators.compose([Validators.required])],
                  },{validator: this.matchPasswords('password', 'confirm_password')}
                );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChangePasswordPage');
  }

  matchPasswords(passwordKey: string, passwordConfirmationKey: string) {
		return (group: FormGroup) => {
			let passwordInput = group.controls[passwordKey],
			passwordConfirmationInput = group.controls[passwordConfirmationKey];
			if (passwordInput.value !== passwordConfirmationInput.value) {
				return passwordConfirmationInput.setErrors({notEquivalent: true})
			}else {
				return passwordConfirmationInput.setErrors(null);
			}
		}
  }
  
  doChangePassword() {
    this.storage.get('userData').then((val) => {
      if(val != null) {
        this.showLoader('Please wait...');
        this.data['id'] = val.id;
        this.userProvider.changePassword(this.data).then((result) => {
          this.loading.dismiss();
          this.presentToast(result['message']);
        }, (err) => {
          this.loading.dismiss();
          this.presentToast(err);
        });
      } else {
        this.presentToast("Invalid user");
      }
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
