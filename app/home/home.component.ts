import { Component, OnInit } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router";
import { HomeService } from "~/shared/home/home.service";
import { DataService, IDataItem } from "../core/data.service";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit {
    items: any;

    constructor(private itemService: HomeService, private router: RouterExtensions) { }

    ngOnInit(): void {
        this.items = this.itemService.getNotifications();
    }
}
