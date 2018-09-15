import { Component, OnInit } from "@angular/core";
import { PageRoute, RouterExtensions } from "nativescript-angular/router";
import { switchMap } from "rxjs/operators";
import { alert } from "ui/dialogs";
import { NotificationService } from "../../../shared/notification/notification.service";

import { Notification } from "~/models/notification.model";

@Component({
    moduleId: module.id,
    selector: "NotificationDetailEdit",
    templateUrl: "./notification-edit.component.html",
    styleUrls: ["./notification-edit.component.scss"]
})
export class NotificationDetailEditComponent implements OnInit {
    private _notification: Notification;
    private _isNotificationImageDirty: boolean = false;
    private _isUpdating: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _pageRoute: PageRoute,
        private _routerExtensions: RouterExtensions
    ) { }

    ngOnInit(): void {

        this._pageRoute.activatedRoute
            .pipe(switchMap((activatedRoute) => activatedRoute.params))
            .forEach((params) => {
                const notificationId = params.id;

                this._notification = this._notificationService.startEdit(notificationId);
            });
    }

    get isUpdating(): boolean {
        return this._isUpdating;
    }

    get notification(): Notification {
        return this._notification;
    }

    get notificationImageUrl(): string {
        return this._notification.imageUrl;
    }

    set notificationImageUrl(value: string) {
        this._notification.imageUrl = value;
        this._isNotificationImageDirty = true;
    }

    get comments(): string {
        return this._notification.comments;
    }

    set comments(value: string) {
        this._notification.comments = value;
    }

    onCancelButtonTap(): void {
        this._routerExtensions.backToPreviousPage();
    }

    onDoneButtonTap(): void {
        let queue = Promise.resolve();

        this._isUpdating = true;

        if (this._isNotificationImageDirty && this._notification.imageUrl) {
            queue = queue
                .then(() => this._notificationService.uploadImage(this._notification.imageStoragePath,
                    this._notification.imageUrl))
                .then((uploadedFile: any) => {
                    this._notification.imageUrl = uploadedFile.url;
                });
        }

        queue.then(() => this._notificationService.update(this._notification))
            .then(() => {
                this._isUpdating = false;
                this._routerExtensions.navigate(["/notifications"], {
                    clearHistory: true,
                    animated: true,
                    transition: {
                        name: "slideBottom",
                        duration: 200,
                        curve: "ease"
                    }
                });
            })
            .catch((errorMessage: any) => {
                this._isUpdating = false;
                alert({ title: "Oops!",
                        message: "Something went wrong. Please try again. Error: " + errorMessage,
                        okButtonText: "Ok" });
            });
    }
}
