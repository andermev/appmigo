import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { WarningService } from "~/shared/warning/warning.service";

@Component({
    selector: "Notification",
    moduleId: module.id,
    templateUrl: "./notification.component.html"
})
export class NotificationComponent implements OnInit {
    items: any;

    constructor(private warningService: WarningService, private router: RouterExtensions) { }

    ngOnInit(): void {
        const notifications = [];
        this.warningService.getNotifications()
            .subscribe((data) => data.forEach((doc) => {
                console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
                notifications.push(doc);
            }),
            () => console.log("Error Get Notification"));
    }
}
