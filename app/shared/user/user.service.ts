import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Response } from "@angular/http";
import firebase = require("nativescript-plugin-firebase");
import { Observable } from "rxjs";
import { User } from "./user";

const tokenKey = "token";
const appSettings = require("application-settings");

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
    return Observable.fromPromise(firebase.createUser({
      email: user.email,
      password: user.password
    }))
    .catch(this.handleErrors);
  }

  normalLogin(user: User) {
    return Observable.fromPromise(firebase.login({
      type: firebase.LoginType.PASSWORD,
      email: user.email,
      password: user.password
    }).then((result: any) => {
        UserService.token = result.uid;
    }))
    .catch(this.handleErrors);
  }

  facebookLogin() {
    return firebase.login({
      type: firebase.LoginType.FACEBOOK,
      scope: ["public_profile", "email"]
    }).then(
        (result) => {
          alert({
            title: "Login OK",
            message: JSON.stringify(result),
            okButtonText: "Nice!"
          });
        },
        (errorMessage) => {
          alert({
            title: "Login error",
            message: errorMessage,
            okButtonText: "OK, pity"
          });
        }
    );
  }

  googleLogin() {
    return Observable.fromPromise(firebase.login({
      type: firebase.LoginType.GOOGLE
    }))
    .catch(this.handleErrors);
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
