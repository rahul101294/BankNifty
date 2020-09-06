import { Component } from '@angular/core';
import { IonicPage, Platform, NavController, ToastController, LoadingController, MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HomeProvider } from '../../providers/home/home';
import { GlobalProvider } from '../../providers/global/global';
import { SocialSharing } from '@ionic-native/social-sharing';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  loading: any;
  data: any = [];
  currency: string;
  device_id: any;
  slider: any;
  pageAllTab: any = 1;
  pageMonthlyTipsTab: any = 1;
  pageAddOnsTab: any = 1;
  pageServiceTab: any = 1;
  noMorePageAllTab: any = false;
  noMorePageMonthlyTipsTab: any = false;
  noMorePageAddOnsTab: any = false;
  noMorePageServiceTab: any = false;
  user_id: any;
  selecteSegment: any;
  constructor(
    public navCtrl: NavController,
    private storage: Storage,
    private homeProvider: HomeProvider,
    private globalProvider: GlobalProvider,
    public toastController: ToastController,
    public loadingCtrl: LoadingController,
    private socialSharing: SocialSharing,
    public platform: Platform,
    private uniqueDeviceID: UniqueDeviceID,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.swipeEnable(true);
    this.selecteSegment = "all";
    this.currency = this.globalProvider.currency;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.platform.ready().then(() => {
      this.uniqueDeviceID.get().then((uuid: any) => {
        this.device_id = uuid;
        console.log(uuid)
      }).catch((error: any) => {
        console.log(error)
      });
      this.checkUser();
    });
  }

  checkUser() {
    this.storage.get('userData').then((val) => {
      if(val == null) {
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.user_id = val.id;
        if(this.selecteSegment == 'all') {
          this.data = [];
          this.pageAllTab = 1;
          this.allTabData(null);
        } else if(this.selecteSegment == 'monthly_tips') {
          this.data = [];
          this.pageMonthlyTipsTab = 1;
          this.monthlyTipsTabData(null);
        } else if(this.selecteSegment == 'add_ons') {
          this.data = [];
          this.pageAddOnsTab = 1;
          this.addOnsTabData(null);
        } else if(this.selecteSegment == 'services') {
          this.data = [];
          this.pageServiceTab = 1;
          this.servicesTabData(null);
        }        
      }
    });
  }

  async doRefresh(event) {
    setTimeout(() => {
      if(this.selecteSegment == 'all') {
        this.data = [];
        this.pageAllTab = 1;
        this.allTabData(null);
      } else if(this.selecteSegment == 'monthly_tips') {
        this.data = [];
        this.pageMonthlyTipsTab = 1;
        this.monthlyTipsTabData(null);
      } else if(this.selecteSegment == 'add_ons') {
        this.data = [];
        this.pageAddOnsTab = 1;
        this.addOnsTabData(null);
      } else if(this.selecteSegment == 'services') {
        this.data = [];
        this.pageServiceTab = 1;
        this.servicesTabData(null);
      }
      event.complete();
    }, 2000);
  }

  segmentChanged(event: any) {
    console.log(event.value);
    if(event.value == 'all') {
      this.data = [];
      this.pageAllTab = 1;
      this.allTabData(null);
    } else if(event.value == 'monthly_tips') {
      this.data = [];
      this.pageMonthlyTipsTab = 1;
      this.monthlyTipsTabData(null);
    } else if(event.value == 'add_ons') {
      this.data = [];
      this.pageAddOnsTab = 1;
      this.addOnsTabData(null);
    } else if(event.value == 'services') {
      this.data = [];
      this.pageServiceTab = 1;
      this.servicesTabData(null);
    }
  }

  allTabData(infiniteScroll) {
    if(this.pageAllTab == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { user_id: this.user_id, device_id: this.device_id,'page':this.pageAllTab};
		this.homeProvider.homeData(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        if(this.pageAllTab == 1) {
          this.slider = result['slider'];
        }
        this.data = this.data.concat(result['data']);
        if(result['data'].length > 0) {
          this.pageAllTab++;
          if(infiniteScroll != null) {
            infiniteScroll.complete();
          }
          this.noMorePageAllTab = result['data'].length < 5 ? true :false;
        } else {
          this.noMorePageAllTab = true;
        }
        //this.data = result['data'];
      } else if(result['status'] == 403) {
        this.presentToast(result['message']);
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.noMorePageAllTab = true;
        this.presentToast("No More Tips Found");
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  monthlyTipsTabData(infiniteScroll) {
    if(this.pageMonthlyTipsTab == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { user_id: this.user_id, device_id: this.device_id,'page':this.pageMonthlyTipsTab};
		this.homeProvider.monthlyTipsTab(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        if(this.pageMonthlyTipsTab == 1) {
          this.slider = result['slider'];
        }
        this.data = this.data.concat(result['data']);
        if(result['data'].length > 0) {
          this.pageMonthlyTipsTab++;
          if(infiniteScroll != null) {
            infiniteScroll.complete();
          }
          this.noMorePageMonthlyTipsTab = result['data'].length < 5 ? true :false;
        } else {
          this.noMorePageMonthlyTipsTab = true;
        }
        //this.data = result['data'];
      } else if(result['status'] == 403) {
        this.presentToast(result['message']);
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.noMorePageMonthlyTipsTab = true;
        this.presentToast("No More Tips Found");
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  addOnsTabData(infiniteScroll) {
    if(this.pageAddOnsTab == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { user_id: this.user_id, device_id: this.device_id,'page':this.pageAddOnsTab};
		this.homeProvider.addOnsTab(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        if(this.pageAddOnsTab == 1) {
          this.slider = result['slider'];
        }
        this.data = this.data.concat(result['data']);
        if(result['data'].length > 0) {
          this.pageAddOnsTab++;
          if(infiniteScroll != null) {
            infiniteScroll.complete();
          }
          this.noMorePageAddOnsTab = result['data'].length < 5 ? true :false;
        } else {
          this.noMorePageAddOnsTab = true;
        }
        //this.data = result['data'];
      } else if(result['status'] == 403) {
        this.presentToast(result['message']);
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.noMorePageAddOnsTab = true;
        this.presentToast("No More Tips Found");
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  servicesTabData(infiniteScroll) {
    if(this.pageServiceTab == 1) {
      this.showLoader('Please wait...');
    }
    let requestData = { user_id: this.user_id, device_id: this.device_id,'page':this.pageServiceTab};
		this.homeProvider.servicesTab(requestData).then((result) => {
      this.loading.dismiss();
      if(result['status'] == 200) {
        if(this.pageServiceTab == 1) {
          this.slider = result['slider'];
        }
        this.data = this.data.concat(result['data']);
        if(result['data'].length > 0) {
          this.pageServiceTab++;
          if(infiniteScroll != null) {
            infiniteScroll.complete();
          }
          this.noMorePageServiceTab = result['data'].length < 5 ? true :false;
        } else {
          this.noMorePageServiceTab = true;
        }
        //this.data = result['data'];
      } else if(result['status'] == 403) {
        this.presentToast(result['message']);
        this.storage.remove('userData');
        this.navCtrl.setRoot('ChooseOptionPage');
      } else {
        this.noMorePageServiceTab = true;
        this.presentToast("No More Tips Found");
      }
      this.presentToast(result['message']);
		}, (err) => {
			this.loading.dismiss();
			this.presentToast(err);
		});
  }

  goToTipDetail(id) {
    let params = { tip_id: id };
    this.navCtrl.push('TipDetailPage', params);
  }

  goToBuyTip(item) {
    let params = { tip: item };
    this.navCtrl.push('TipCheckoutPage', params);
  }

  share(item) {
    let message = item.plan_name;
    let subject = 'BANKNIFTY HNI CALLS';
    let file = 'http://hnicalls.com/graph.png';
    let url = 'https://play.google.com/store/apps/details?id=com.hni.calls';
    this.socialSharing.share(message, subject, file, url).then(() => {
      this.presentToast('Plan share successfully');
    }).catch(() => {
      //this.presentToast('Please try again');
    });
  }

  goToBuySubscribe(plan_id, plan, tip_id) {
    let detail = { plan_id: plan_id, plan: plan, tip: tip_id };
    this.navCtrl.push('CartPage', detail);
  }

  goToSubscriptionPlan() {
    this.navCtrl.push('SubscriptionPlanPage');
  }

  goToServiceDetail(item) {
    let params = { data: item };
    this.navCtrl.push('ServiceDetailPage', params);
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
