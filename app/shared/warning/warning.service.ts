import { Injectable, NgZone } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase";
import { Observable } from "rxjs";
import { Notification } from "~/models/notification.model";

const firebase = require("nativescript-plugin-firebase/app");

@Injectable()
export class WarningService {
    notification: Notification;

    private notifications: Array<Notification> = [];

    constructor(private zone: NgZone) { }

    getNotificationsByUser(): Observable<Array<Notification>> {
        return Observable.create((subscriber) => {
            const notRef: firestore.CollectionReference = firebase.firestore().collection("alerts");
            notRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.zone.run(() => {
                    this.notifications = [];
                    snapshot.forEach((docSnap) => {
                        console.log("Document Firebase: " + `${docSnap.id} => ${JSON.stringify(docSnap.data())}`);
                        this.notifications.push(new Notification(docSnap.data()));
                    });
                    subscriber.next(this.notifications);
                });
            });
        }, (err) => {
            console.log(`Encountered error: ${err}`);
        });
    }
}
