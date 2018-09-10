import { Injectable, NgZone } from "@angular/core";
import { firestore } from "nativescript-plugin-firebase";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Notification } from "~/models/notification.model";

const firebase = require("nativescript-plugin-firebase/app");

@Injectable()
export class NotificationService {
    notification: Notification;

    private _notifications: Array<Notification> = [];

    constructor(private zone: NgZone) { }

    getNotificationsByUser(): Observable<Array<Notification>> {
        return Observable.create((subscriber) => {
            const notRef: firestore.CollectionReference = firebase.firestore().collection("alerts");
            notRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.zone.run(() => {
                    const results = this.handleSnapshot(snapshot);
                    subscriber.next(results);
                });
            });
        }, (err) => {
            console.log(`Encountered error: ${err}`);
        }).pipe(catchError(this.handleErrors));
    }

    getNotificationsByZone(): Observable<Array<Notification>> {
        return Observable.create((subscriber) => {
            const notRef: firestore.CollectionReference = firebase.firestore().collection("alerts");
            notRef.onSnapshot((snapshot: firestore.QuerySnapshot) => {
                this.zone.run(() => {
                    const results = this.handleSnapshot(snapshot);
                    subscriber.next(results);
                });
            });
        }, (err) => {
            console.log(`Encountered error: ${err}`);
        }).pipe(catchError(this.handleErrors));
    }

    private handleSnapshot(snapshot: firestore.QuerySnapshot): Array<Notification> {
        this._notifications = [];

        if (snapshot) {
            snapshot.forEach((docSnap) => {
                console.log("Document Firebase: " + `${docSnap.id} => ${JSON.stringify(docSnap.data())}`);
                this._notifications.push(new Notification(docSnap.data()));
            });
        }

        return this._notifications;
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }
}
