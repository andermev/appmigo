import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { WarningService } from "~/shared/warning/warning.service";
import { DataService, IDataItem } from "../core/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: any;

    constructor(private warningService: WarningService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.warningService.getNotifications();
    }
}
