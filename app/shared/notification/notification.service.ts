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
    private _editNotification: Notification;

    constructor(private zone: NgZone) { }

    /**
     * Start services to notification list.
     */
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

    /**
     * End services notification list.
     */

    /**
     * Start services to edit and create notification.
     */
    startEdit(id: string): Notification {
        this._editNotification = null;

        return this.getEditableNotificationById(id);
    }

    getEditableNotificationById(id: string): Notification {
        if (!this._editNotification || this._editNotification.id !== id) {
            const notification = this.getNotificationById(id);

            // get fresh editable copy of notification model
            this._editNotification = new Notification(notification);
        }

        return this._editNotification;
    }

    getNotificationById(id: string): Notification {
        if (!id) {
            return;
        }

        return this._notifications.filter((notification) => {
            return notification.id === id;
        })[0];
    }
    /**
     * End services to edit and create notification.
     */

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
