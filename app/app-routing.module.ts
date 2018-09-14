import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { MapComponent } from "~/component/map/map.component";
import { LoginComponent } from "~/core/auth/login/login.component";
import { BrowseComponent } from "./component/browse/browse.component";
import { NotificationComponent } from "./component/notification/notification.component";
import { SearchComponent } from "./component/search/search.component";

export const COMPONENTS = [BrowseComponent, NotificationComponent, SearchComponent, LoginComponent, MapComponent];

const routes: Routes = [
    { path: "", redirectTo: "/(notificationTab:notification//browseTab:browse//searchTab:search)", pathMatch: "full" },
    { path: "login", component: LoginComponent},
    { path: "notification", component: NotificationComponent, outlet: "notificationTab" },
    { path: "browse", component: BrowseComponent, outlet: "browseTab" },
    { path: "search", component: SearchComponent, outlet: "searchTab" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
