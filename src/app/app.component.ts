import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { FCM } from '@ionic-native/fcm';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'ChooseOptionPage';

  pages: Array<{title: string, component: any, icon: string}>;
  mobileno: any;
  full_name: any;
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private storage: Storage,
    private alertCtrl: AlertController,
    public menuCtrl: MenuController,
    private uniqueDeviceID: UniqueDeviceID,
    private fcm: FCM
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'home' },
      { title: 'Profile', component: 'ProfilePage', icon: 'person' },
      { title: 'Wallet', component: 'WalletPage', icon: 'cash' },
      { title: 'All Plans', component: 'SubscriptionPlanPage', icon: 'information-circle' },
      { title: 'My Subscription', component: 'MySubscriptionPage', icon: 'paper' },
      { title: 'My Tips', component: 'MyTipsPage', icon: 'paper' },
      { title: 'My Add-ons', component: 'MyAddonsPage', icon: 'paper' },
      { title: 'My Services', component: 'MyServicesPage', icon: 'paper' },
      { title: 'Change Password', component: 'ChangePasswordPage', icon: 'lock' },
      { title: 'Settings', component: 'SettingsPage', icon: 'settings' },
      { title: 'More', component: 'MorePage', icon: 'more' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.storage.get('userData').then((userData) => {
        if(userData != null) {
          this.full_name = userData.full_name;
          this.mobileno = userData.mobile;
        }
      });

      this.uniqueDeviceID.get().then((uuid: any) => {
        console.log(uuid)
      }).catch((error: any) => {
        console.log(error)
      });

	//if(this.platform.is('core')) {
	  this.fcm.getToken().then(token => {
		console.log('token',token);
	  });
	  
	  this.fcm.onNotification().subscribe(data => {
		if(data.wasTapped){
		  console.log("Received in background");
		} else {
		  console.log("Received in foreground");
		};
	  });
	  
	  this.fcm.onTokenRefresh().subscribe(token => {
		console.log('token',token);
	  });
	//}
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout() {
    let alert = this.alertCtrl.create({
      title: 'Logout',
      message: 'Are you sure?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            this.menuCtrl.close();
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.storage.remove('userData');
            this.menuCtrl.close();
            this.nav.setRoot('ChooseOptionPage');
          }
        }
      ]
    });
    alert.present();
  }
}
