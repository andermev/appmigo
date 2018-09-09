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
    notifications$: Observable<Array<Notification>>;

    constructor(private warningService: WarningService) { }

    ngOnInit(): void {
        this.notifications$ = this.warningService.getNotificationsByUser();
    }
}
