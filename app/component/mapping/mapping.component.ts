import { animate, state, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";
import { AddressOptions, Directions } from "nativescript-directions";
import { MapboxViewApi, Viewport as MapboxViewport } from "nativescript-mapbox";
import { PropertyChangeData } from "tns-core-modules/data/observable";

@Component({
  selector: "page-mapping",
  moduleId: module.id,
  templateUrl: "./mapping.component.html",
  styleUrls: ["mapping-common.css"],
  animations: [
    trigger("flyInOut", [
      state("in", style({transform: "scale(1)", opacity: 1})),
      transition("void => *", [
        style({transform: "scale(0.9)", opacity: 0}),
        animate("1000ms 100ms ease-out")
      ])
    ]),
    trigger("from-left", [
      state("in", style({
        opacity: 0.8,
        transform: "translate(0)"
      })),
      state("void", style({
        opacity: 0,
        transform: "translate(-20%)"
      })),
      transition("void => *", [animate("700ms 1800ms ease-out")])
    ]),
    trigger("from-right", [
      state("in", style({
        opacity: 1,
        transform: "translate(0)"
      })),
      state("void", style({
        opacity: 0,
        transform: "translate(20%)"
      })),
      transition("void => *", [animate("700ms 2700ms ease-out")])
    ])
  ]
})
export class MappingComponent {

  following: boolean = false;

  private directions: Directions;
  private map: MapboxViewApi;

  onMapReady(args): void {
    this.map = args.map;
    this.map.addMarkers([
          {
            id: 1,
            lat: 42.624189,
            lng: 23.372106,
            title: 'DevReach 2017',
            subtitle: 'Such an awesome little conference',
            onTap: () => {
              console.log("DevReach 2017 was tapped");
            },
            onCalloutTap: () => {
              console.log("DevReach 2017 callout tapped");
            }
          },
          {
            id: 3,
            lat: 52.1851585,
            lng: 5.3974241,
            title: "Eddy's home",
            subtitle: "Tap to show directions (with waypoints)",
            iconPath: "images/mapmarkers/home_marker.png",
            onTap: () => console.log("Eddy's home was tapped"),
            onCalloutTap: () => {
              this.showDirectionsTo([
                {
                  lat: 43.421834,
                  lng: 24.086096
                },
                {
                  lat: 52.1851585,
                  lng: 5.3974241
                }
              ]);
            }
          },
          {
            id: 4,
            lat: 43.421834,
            lng: 24.086096,
            icon: 'res://truck1',
            title: "Dangerous truckdriver",
            subtitle: "Tap to show directions",
            onTap: () => {
              console.log("Truck 1 was tapped");
            },
            onCalloutTap: () => {
              this.showDirectionsTo([{
                lat: 43.421834,
                lng: 24.086096
              }]);
            }
          },
          {
            id: 5,
            lat: 42.421834,
            lng: 26.786096,
            icon: 'res://truck2'
          },
          {
            id: 6,
            lat: 42.021834,
            lng: 25.086096,
            icon: 'res://truck3'
          },
          {
            id: 7,
            lat: 37.3754338,
            lng: -5.9900776,
            icon: 'res://eddy_siesta',
            title: "Mr. Siesta",
            subtitle: "Loves Angular, especially lazzzzzy loading",
          },
          {
            id: 8,
            lat: 12.518514,
            lng: -70.2474425,
            icon: 'res://eddy_cool',
            title: "Mr. Cool",
            subtitle: "Thinks Vue is awesome"
          },
          {
            id: 9,
            lat: 61.6319675,
            lng: 23.5501232,
            icon: 'res://eddy_nerd',
            title: "Mr. Nerdy",
            subtitle: "A genuine JS and TS nerd"
          },
          {
            id: 10,
            lat: 48.2208286,
            lng: 16.2399779,
            icon: 'res://eddy_sport',
            title: "Mr. Sporty",
            subtitle: "Runs through diagrams like a madman"
          }
        ]
    );

    // Use this if you want to track the user on the map
    // this.map.trackUser({
    //   mode: "FOLLOW_WITH_HEADING",
    //   animated: true
    // });
  }

  toggleFollowing(args: PropertyChangeData): void {
    if (args.value !== null && args.value !== this.following) {
      this.following = args.value;
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
      const longit = (viewport.bounds.east + viewport.bounds.west) / 2;
      const markerId = new Date().getTime();

      this.map.addMarkers([{
        id: new Date().getTime(),
        lat: latit,
        lng: longit,
        title: "FAB marker",
        subtitle: "Tap to remove",
        onCalloutTap: () => {
          this.map.removeMarkers([markerId]);
        }
      }]);
    });
  }

  protected getScreenName(): string {
    return "Mapping";
  }

  private showDirectionsTo(addresses: Array<AddressOptions>): void {
    this.directions.navigate({
      to: addresses,
      ios: {
        // Apple Maps can't show waypoints, so open Google maps if available in that case
        preferGoogleMaps: addresses.length > 1,
        allowGoogleMapsWeb: true
      }
    });
  }
}
