import { UserService } from "~/shared/user/user.service";
import { Config } from "./config";

const firebase = require("nativescript-plugin-firebase");

/* ***********************************************************
* The {N} Firebase plugin initialization is explained in the plugin readme here:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#usage
* Another important part of the initialization are the prerequisites:
* https://github.com/EddyVerbruggen/nativescript-plugin-firebase#prerequisites
* In this template, Firebase is set up with a custom existing project, so that
* You can build and run this template without creating your own Firebase project.
* Note that if you change the bundle id of the application, the Firebase configuration
* will stop working.
*************************************************************/

export function initFirebase() {
    const firebaseCopy = firebase;
    firebase.init({
        persist: true,
        storageBucket: Config.firebaseBucket,
        onAuthStateChanged: (data) => { // re-logon the user when he re-visits your app
            console.log(data.loggedIn ? "Logged in to firebase" : "Logged out from firebase");
            if (data.loggedIn) {
                console.log("user's email address: " + (data.user.email ? data.user.email : "N/A"));
                UserService.token = data.user.uid;
            } else {
                UserService.token = "";
            }
        }
    }).then((instance) => {
        console.log("firebase.init done");
    }, (error) => console.log("firebase.init error: " + error));
}

export function initLoginFacebook() {
    firebase.login({
        type: firebase.LoginType.FACEBOOK,
        // Optional
        facebookOptions: {
          // defaults to ['public_profile', 'email']
          scope: ["public_profile", "email"]
        }
      }).then((result) => {
            JSON.stringify(result);
          }, (errorMessage) => {
            console.log("facebook.login error: " + errorMessage);
          }
      );
}

export function initLoginGoogle() {
    firebase.login({
        type: firebase.LoginType.GOOGLE,
        // Optional
        googleOptions: {
          hostedDomain: "appmigo.co"
        }
      }).then((result) => {
            JSON.stringify(result);
          }, (errorMessage) => {
            console.log("google.login error: " + errorMessage);
          }
      );
}
