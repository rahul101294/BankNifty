import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  public baseURL: string;
  constructor(
    public http: HttpClient,
    private globalProvider: GlobalProvider
  ) {
    console.log('Hello UserProvider Provider');
    this.baseURL = this.globalProvider.baseURL;
  }

  profileData(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'profile', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  changePassword(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'changep', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  catSubscribe(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'catSubscribe', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  tipSubscribe(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'tipSubscribe', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  mySubscriptions(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'mySubscriptions', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  myTips(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'myTips', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  myAddons(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'myAddons', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  tipDetail(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'tipDetail', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  changeNotification(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'changeNotification', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  addAmount(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'addAmount', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  walletHistory(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'walletHistory', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  serviceSubscribe(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'serviceSubscribe', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }
}
