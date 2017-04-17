import {Injectable} from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class UserAuthService{

  loggedInUser: string = null;
  redirectUrl: string;

  player = {
    '_id':''
  }


  login(userName: string) {
    console.log(this.player._id + " - From within the user-auth.service")
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
