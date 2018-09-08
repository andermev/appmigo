import { Injectable, NgZone } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase";
import { from, Observable } from "rxjs";
import { Notification } from "~/models/notification.model";

const firebase = require("nativescript-plugin-firebase/app");

@Injectable()
export class WarningService {
    notification: Notification;

    private cities: Array<Notification> = [];

    constructor(private zone: NgZone) { }

    getNotifications(): any {
        return from(firebase.firestore().collection("alerts").get());
    }

    firestoreCollectionObservable(): Observable<Array<Notification>> {
        return Observable.create((subscriber) => {
            const colRef: firestore.CollectionReference = firebase.firestore().collection("alerts");
            colRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
            this.zone.run(() => {
                this.cities = [];
                snapshot.forEach((docSnap) => {
                    console.log("Document Firebase" + `${docSnap.id} => ${JSON.stringify(docSnap.data())}`);
                    this.cities.push(new Notification(docSnap.data()));
                });
                subscriber.next(this.cities);
            });
            });
        });
    }
}
