import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { NotificationDetailEditComponent } from "../notification/notification-detail-edit/notification-edit.component";
import { NotificationComponent } from "./notification.component";

const routes: Routes = [
    { path: "", component: NotificationComponent },
    { path: "notification-detail-edit/:id", component: NotificationDetailEditComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class NotificationRoutingModule { }
