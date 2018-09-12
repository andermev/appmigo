import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { TNSFontIconModule } from "nativescript-ngx-fonticon";
import { MappingRoutingModule } from "./mapping-routing.module";
import { MappingComponent } from "./mapping.component";

import { registerElement } from "nativescript-angular/element-registry";

registerElement("Mapbox", () => require("nativescript-mapbox").MapboxView);

@NgModule({
  imports: [
    NativeScriptCommonModule,
    MappingRoutingModule,
    TNSFontIconModule
  ],
  declarations: [
    MappingComponent
  ],
  schemas: [
    NO_ERRORS_SCHEMA
  ]
})
export class MappingModule { }
