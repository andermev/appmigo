import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import { from , Observable } from "rxjs";
import { User } from "./user";

const tokenKey = "token";
const appSettings = require("application-settings");

const firebase = require("nativescript-plugin-firebase");

@Injectable()
export class UserService {

  static get token(): string {
    return appSettings.getString("token");
  }

  static set token(theToken: string) {
    appSettings.setString("token", theToken);
  }

  static isLoggedIn(): boolean {
    return !!appSettings.getString("token");
  }
  constructor(private http: HttpClient) {}

  register(user: User) {
    const promiseCreateUser = new Promise<any>((resolve, reject) => {
      firebase.createUser({
          email: user.email,
          password: user.password
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        this.handleErrors(err);
        reject(err);
      });
    });

    return from(promiseCreateUser);
  }

  normalLogin(user: User) {
    const promiseNormalLogin = new Promise<any>((resolve, reject) => {
      firebase.login({
        type: firebase.LoginType.PASSWORD,
        email: user.email,
        password: user.password
      })
      .then((res: any) => {
        UserService.token = res.uid;
        resolve(res);
      })
      .catch((err) => {
        this.handleErrors(err);
        reject(err);
      });
    });

    return from(promiseNormalLogin);
  }

  facebookLogin() {
    const promiseFacebookLogin = new Promise<any>((resolve, reject) => {
      firebase.login({
        type: firebase.LoginType.FACEBOOK,
        scope: ["public_profile", "email"]
      })
      .then((res: any) => {
        alert({
          title: "Login OK",
          message: JSON.stringify(res),
          okButtonText: "Nice!"
        });
        resolve(res);
      })
      .catch((err) => {
        alert({
          title: "Login error",
          message: err,
          okButtonText: "OK, pity"
        });
        this.handleErrors(err);
        reject(err);
      });
    });

    return from(promiseFacebookLogin);
  }

  googleLogin() {
    const promiseGoogleLogin = new Promise<any>((resolve, reject) => {
      firebase.login({
        type: firebase.LoginType.GOOGLE
      })
      .then((res: any) => {
        alert({
          title: "Login OK",
          message: JSON.stringify(res),
          okButtonText: "Nice!"
        });
        resolve(res);
      })
      .catch((err) => {
        alert({
          title: "Login error",
          message: err,
          okButtonText: "OK, pity"
        });
        this.handleErrors(err);
        reject(err);
      });
    });

    return from(promiseGoogleLogin);
  }

  resetPassword(user: User) {
    firebase.resetPassword({
      email: user.email
    }).then(
      (result) => {
        alert("Please check your email to reset your password!");
      },
      (errorMessage) => {
        console.log(errorMessage);
      }
    );
  }

  handleErrors(error: Response) {
    console.log(JSON.stringify(error));
    return Observable.throw(error);
  }
}
