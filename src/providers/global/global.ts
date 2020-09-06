import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GlobalProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GlobalProvider {

  public baseURL: string;
  public currency: string;
  constructor(
    public http: HttpClient
  ) {
    this.baseURL = "https://hnicalls.com/api/v3/?r=";
    this.currency = "₹ ";
  }

  pagesList() {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'pagesList')
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

  pageDetail(requestData) {
    return new Promise((resolve, reject) => {
      this.http.get(this.baseURL+'pageDetail', {params: requestData})
      .subscribe(res => {
        resolve(res);
      }, (err) => {
          reject(err);
      });
    });
  }

}
