import { Component, Input } from "@angular/core";
import { registerElement } from "nativescript-angular/element-registry";
import { MapView, Marker, Position } from "nativescript-google-maps-sdk";

import { isAndroid, isIOS } from "platform";

// Important - must register MapView plugin in order to use in Angular templates
registerElement("MapView", () => MapView);

declare var com: any;

@Component({
    moduleId: module.id,
    selector: "map",
    templateUrl: "map.html",
    styleUrls: ["map.css"]
})
export class MapComponent {

    mapView: MapView;
    lastCamera: string;

    private _latitude;
    private _longitude;
    private _zoom;
    private _minZoom;
    private _maxZoom;
    private _bearing;
    private _tilt;
    private _padding;

    @Input()
    set latitude(latitude: number) {
        this._latitude = latitude || -33.86;
    }
    get latitude(): number { return this._latitude; }

    @Input()
    set longitude(longitude: number) {
        this._longitude = longitude || 151.20;
    }
    get longitude(): number { return this._longitude; }

    @Input()
    set zoom(zoom: number) {
        this._zoom = zoom || 8;
    }
    get zoom(): number { return this._zoom; }

    @Input()
    set minZoom(minZoom: number) {
        this._minZoom = minZoom || 0;
    }
    get minZoom(): number { return this._minZoom; }

    @Input()
    set maxZoom(maxZoom: number) {
        this._maxZoom = maxZoom || 22;
    }
    get maxZoom(): number { return this._maxZoom; }

    @Input()
    set bearing(bearing: number) {
        this._bearing = bearing || 0;
    }
    get bearing(): number { return this._bearing; }

    @Input()
    set tilt(tilt: number) {
        this._tilt = tilt || 0;
    }
    get tilt(): number { return this._tilt; }

    @Input()
    set padding(padding: number) {
        this._padding = padding || [40, 40, 40, 40];
    }
    get padding(): number { return this._padding; }

    // Map events
    onMapReady(event) {
        console.log("Map Ready");

        this.mapView = event.object;

        console.log("Setting a marker...");

        const marker = new Marker();
        marker.position = Position.positionFromLatLng(this._latitude, this._longitude);
        marker.title = "Sydney";
        marker.snippet = "Australia";
        marker.userData = {index: 1};
        marker.visible = true;
        this.mapView.addMarker(marker);
        // this.mapView.longitude = this._latitude;
        // this.mapView.latitude = this._longitude;
        // this.mapView.zoom = this._zoom;
        this._doZoom();
    }

    onCoordinateTapped(args) {
        console.log("Coordinate Tapped, Lat: " + args.position.latitude + ", Lon: " + args.position.longitude, args);
    }

    onMarkerEvent(args) {
        console.log("Marker Event: " + args.eventName + " triggered on: " + args.marker.title +
        ", Lat: " + args.marker.position.latitude + ", Lon: " + args.marker.position.longitude, args);
    }

    onCameraChanged(args) {
        console.log("Camera changed: " + JSON.stringify(args.camera), JSON.stringify(args.camera) === this.lastCamera);
        this.lastCamera = JSON.stringify(args.camera);
    }

    onCameraMove(args) {
        console.log("Camera moving: " + JSON.stringify(args.camera));
    }

    private _doZoom() {

        if (isAndroid) {
            const builder = new com.google.android.gms.maps.model.LatLngBounds.Builder();
            this.mapView.findMarker((marker) => {
                builder.include(marker.android.getPosition());

                return false;
            });
            const bounds = builder.build();
            const padding: number = 100;
            const cu = com.google.android.gms.maps.CameraUpdateFactory.newLatLngBounds(bounds, padding);
            this.mapView.gMap.animateCamera(cu);
        }
    }
}
