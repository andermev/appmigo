import { Component, Input } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
import { PropertyChangeData } from "tns-core-modules/data/observable";

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

@Component({
    moduleId: module.id,
    selector: "map",
    templateUrl: "map.html",
    styleUrls: ["map.css"]
})
export class MapComponent {

    following: boolean = false;
    private map: MapboxViewApi;

    private _latitude;
    private _longitude;
    private _accessToken;
    private _mapStyle;
    private _hideCompass;
    private _zoomLevel;
    private _showUserLocation;
    private _disableZoom;
    private _disableRotation;
    private _disableScroll;
    private _disableTilt;

    @Input()
    set latitude(latitude: number) {
        this._latitude = latitude || 50.467735;
    }
    get latitude(): number { return this._latitude; }

    @Input()
    set longitude(longitude: number) {
        this._longitude = longitude || 13.427718;
    }
    get longitude(): number { return this._longitude; }

    @Input()
    set accessToken(accessToken: string) {
        this._accessToken = accessToken || 8;
    }
    get accessToken(): string { return this._accessToken; }

    @Input()
    set mapStyle(mapStyle: string) {
        this._mapStyle = mapStyle || "traffic_day";
    }
    get mapStyle(): string { return this._mapStyle; }

    @Input()
    set hideCompass(hideCompass: boolean) {
        this._hideCompass = hideCompass || true;
    }
    get hideCompass(): boolean { return this._hideCompass; }

    @Input()
    set zoomLevel(zoomLevel: number) {
        this._zoomLevel = zoomLevel || 18;
    }
    get zoomLevel(): number { return this._zoomLevel; }

    @Input()
    set showUserLocation(showUserLocation: boolean) {
        this._showUserLocation = showUserLocation || false;
    }
    get showUserLocation(): boolean { return this._showUserLocation; }

    @Input()
    set disableZoom(disableZoom: boolean) {
        this._disableZoom = disableZoom || false;
    }
    get disableZoom(): boolean { return this._disableZoom; }

    @Input()
    set disableRotation(disableRotation: boolean) {
        this._disableRotation = disableRotation || false;
    }
    get disableRotation(): boolean { return this._disableRotation; }

    @Input()
    set disableScroll(disableScroll: boolean) {
        this._disableScroll = disableScroll || false;
    }
    get disableScrollsableZoom(): boolean { return this._disableScroll; }

    @Input()
    set disableTilt(disableTilt: boolean) {
        this._disableTilt = disableTilt || false;
    }
    get disableTilt(): boolean { return this._disableTilt; }

    // Map events
    onMapReady(event) {
        this.map = event.map;
        this.map.addMarkers([
                {
                    id: 1,
                    lat: this._latitude,
                    lng: this._longitude,
                    title: "DevReach 2017",
                    subtitle: "Such an awesome little conference",
                    onTap: () => {
                    console.log("DevReach 2017 was tapped");
                    },
                    onCalloutTap: () => {
                    console.log("DevReach 2017 callout tapped");
                    }
                }
            ]
        );
    }

    toggleFollowing(event: PropertyChangeData): void {
        if (event.value !== null && event.value !== this.following) {
            this.following = event.value;
            // adding a timeout so the switch has time to animate properly
            setTimeout(() => {
            this.map.trackUser({
                mode: this.following ? "FOLLOW_WITH_COURSE" : "NONE",
                animated: true
            });
            }, 200);
        }
    }

    fabTapped(): void {
        // add a marker at the center of the viewport
        this.map.getViewport().then((viewport: MapboxViewport) => {
        const latit = (viewport.bounds.north + viewport.bounds.south) / 2;
        const longt = (viewport.bounds.east + viewport.bounds.west) / 2;
        const markerId = new Date().getTime();

        this.map.addMarkers([{
            id: new Date().getTime(),
            lat: latit,
            lng: longt,
            title: "FAB marker",
            subtitle: "Tap to remove",
            onCalloutTap: () => {
                this.map.removeMarkers([markerId]);
            }
        }]);
    });
    }
}
