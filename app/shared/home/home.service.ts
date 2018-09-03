import { Injectable } from "@angular/core";
import { Notification } from "~/model/notification.model";

@Injectable()
export class HomeService {
    getNotifications(): any {
        const firebase = require("nativescript-plugin-firebase/app");
        const citiesCollection = firebase.firestore().collection("alerts");

        const notifications = [];
        citiesCollection.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                notifications.push(doc);
            });
        });

        return notifications;
    }
}
