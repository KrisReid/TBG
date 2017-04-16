import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class UserAuthService{

  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });

  constructor(private http: Http) { }

  loggedInUser: string = null;
  redirectUrl: string;

  player = {
    '_id': ''
  }

  login(userName: string) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loggedInUser = userName;
        resolve();
      }, 1000);
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this.loggedInUser = null;
        this.redirectUrl = null;
        resolve();
      }, 200);
    });
  }

}
