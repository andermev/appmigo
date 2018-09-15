import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { NativeScriptUIListViewModule } from "nativescript-ui-listview/angular";

import { MyImageAddRemoveComponent } from "../../shared/my-image-add-remove/my-image-add-remove.component";
import { NotificationService } from "../../shared/notification/notification.service";
import { NotificationDetailEditComponent } from "../notification/notification-detail-edit/notification-edit.component";
import { NotificationRoutingModule } from "../notification/notification-routing.module";

@NgModule({
    imports: [
        NotificationRoutingModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptUIListViewModule
    ],
    declarations: [
        NotificationDetailEditComponent,
        MyImageAddRemoveComponent
    ],
    providers: [
        NotificationService
    ],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
export class NotificationModule { }
