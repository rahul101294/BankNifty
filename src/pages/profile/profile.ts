import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  loading: any;
  data: any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private userProvider: UserProvider,
    private storage: Storage,
    public toastController: ToastController,
    public loadingCtrl: LoadingController
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.storage.get('userData').then((userData) => {
      if(userData != null) {
        this.profileData(userData);
      } else {
        this.storage.remove('userData');
        this.presentToast('Session expire');
        this.navCtrl.setRoot('ChooseOptionPage');
      }
    });
    
  }

  profileData(userData) {
    this.showLoader('Please wait...');
    let requestData = { id: userData.id};
		this.userProvider.profileData(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        this.data = result['data'];
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  editProfile() {
    this.navCtrl.push('EditProfilePage');
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
