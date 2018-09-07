import { Injectable, NgZone } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { Notification } from "~/model/notification.model";

const firebase = require("nativescript-plugin-firebase/app");

@Injectable()
export class WarningService {

    private _notification: Array<Notification> = [];

    constructor(private _ngZone: NgZone) { }

    getNotifications(): Observable<any> {
        return new Observable((observer: any) => {
            const collectionName = "alerts";
            const alertsCollection = firebase.firestore().collection(collectionName);

            alertsCollection.get().then((querySnapshot) => {
                console.log(`${querySnapshot.id} => ${JSON.stringify(querySnapshot.data())}`);
                this._ngZone.run(() => {
                    const results = this.handleSnapshot(querySnapshot);
                    observer.next(results);
                });
            });

            //firebase.addValueEventListener(onValueEvent, `/${collectionName}`);
        }).pipe(catchError(this.handleErrors));
    }

    private handleSnapshot(data: any): Array<Notification> {
        this._notification = [];
        if (data) {
            console.log(`${data.id} => ${JSON.stringify(data.data())}`);
            for (const id in data) {
                if (data.hasOwnProperty(id)) {
                    this._notification.push(new Notification(data[id]));
                }
            }
        }

        return this._notification;
    }

    private handleErrors(error: Response): Observable<never> {
        return throwError(error);
    }
}
