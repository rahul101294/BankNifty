import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';

/*
  Generated class for the AuthProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthProvider {

  public baseURL: string;
  constructor(
    public http: HttpClient,
    private globalProvider: GlobalProvider
  ) {
    console.log('Hello AuthProvider Provider');
    this.baseURL = this.globalProvider.baseURL;
  }

  login(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'login', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }
  
  forgotPassword(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'forgotu', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  resetPassword(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'resetPassword', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  register(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'register', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  verifyOtp(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'validotp', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  forgotPasswordByMobile(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'forgotPassword', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  resendOtp(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.baseURL+'resendOtp', JSON.stringify(data))
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }
}
