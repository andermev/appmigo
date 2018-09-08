import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { Observable } from "rxjs";
import { Notification } from "~/models/notification.model";
import { WarningService } from "~/shared/warning/warning.service";

@Component({
    selector: "Notification",
    moduleId: module.id,
    templateUrl: "./notification.component.html"
})
export class NotificationComponent implements OnInit {
    items = [];
    myCities$: Observable<Array<Notification>>;

    constructor(private warningService: WarningService, private router: RouterExtensions) { }

    ngOnInit(): void {
        // this.warningService.getNotifications()
        //     .subscribe((data) => data.forEach((doc) => {
        //         console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
        //         this.items.push(doc.data());
        //     }),
        //     () => console.log("Error Get Notification"))
        //     .catch((err) => console.log("Get failed, error: " + err));
        this.myCities$ = this.warningService.firestoreCollectionObservable();
    }
}
