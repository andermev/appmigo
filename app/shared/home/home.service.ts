import { Injectable } from "@angular/core";

@Injectable()
export class HomeService {
    getNotifications(): any {
        const firebase = require("nativescript-plugin-firebase/app");
        const alertsCollection = firebase.firestore().collection("alerts");

        const notifications = [];
        alertsCollection.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                notifications.push(doc);
            });
        });

        return notifications;
    }
}
