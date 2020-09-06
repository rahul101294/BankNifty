import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the HomeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HomeProvider {

  public baseURL: string;
  constructor(
    public http: HttpClient,
    private globalProvider: GlobalProvider
  ) {
    console.log('Hello HomeProvider Provider');
    this.baseURL = this.globalProvider.baseURL;
  }

  homeData(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'home', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  monthlyTipsTab(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'monthlyTipsTab', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  addOnsTab(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'addOnsTab', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  servicesTab(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'servicesTab', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  subscriptionPlanData(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'subscriptionPlans', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  subscriptionPlanDetail(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'subscriptionPlanDetail', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  carDetail(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'carDetail', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  checkOutTipDetail(requestData) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'checkOutTipDetail', JSON.stringify(requestData))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  fetchTotalWallet(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'fetchTotalWallet', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  myServices(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'myServices', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  serviceContent(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'serviceContent', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  servicesReviews(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'servicesReviews', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  servicesReviewWrite(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'servicesReviewWrite', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }
}
