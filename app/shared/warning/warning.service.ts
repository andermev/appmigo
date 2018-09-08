import { Injectable, NgZone } from "@angular/core";
import { from } from "rxjs";

const firebase = require("nativescript-plugin-firebase/app");

@Injectable()
export class WarningService {

    getNotifications(): any {
        return from(firebase.firestore().collection("alerts").get());
    }
}
