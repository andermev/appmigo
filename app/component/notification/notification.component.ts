import { Component, OnDestroy, OnInit } from "@angular/core";
import { ObservableArray } from "data/observable-array";
import { RouterExtensions } from "nativescript-angular/router";
import { Subscription } from "rxjs";
import { finalize } from "rxjs/operators";
import { Notification } from "~/models/notification.model";
import { NotificationService } from "~/shared/notification/notification.service";

@Component({
    selector: "Notification",
    moduleId: module.id,
    templateUrl: "./notification.component.html",
    styleUrls: ["./notification.component.scss"]
})
export class NotificationComponent implements OnInit, OnDestroy {
    private _isLoading: boolean = false;
    private _notifications: ObservableArray<Notification> = new ObservableArray<Notification>([]);
    private _notificationSubscription: Subscription;

    constructor(private _notificationService: NotificationService,
                private _routerExtensions: RouterExtensions) { }

    ngOnInit(): void {
        if (!this._notificationSubscription) {
            this._isLoading = true;

            this._notificationSubscription = this._notificationService.getNotificationsByUser()
                .pipe(finalize(() => this._isLoading = false))
                .subscribe((notifications: Array<Notification>) => {
                    this._notifications = new ObservableArray(notifications);
                    this._isLoading = false;
                });
        }
    }

    get notifications(): ObservableArray<Notification> {
        return this._notifications;
    }

    get isLoading(): boolean {
        return this._isLoading;
    }

    onBackButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onEditButtonTap(): void {
        this._routerExtensions.navigate(["notification-detail-edit/:id", this._notifications.id],
            {
                animated: true,
                transition: {
                    name: "slideTop",
                    duration: 200,
                    curve: "ease"
                }
            });
    }

    ngOnDestroy(): void {
        if (this._notificationSubscription) {
            this._notificationSubscription.unsubscribe();
            this._notificationSubscription = null;
        }
    }
}
