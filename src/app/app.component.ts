import { Component } from '@angular/core';
import {LngLat, LngLatBounds} from "mapbox-gl";
import {Borne} from "./model/borne";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'epidhec-connect';
  maxBounds = new LngLatBounds([0.08, 49.46], [0.20, 49.50]);

  instantiateBornes = (number: number) => {
    let bornes = [];
    for (let i = 0; i < number; i++)
      bornes.push(new Borne(new LngLat(0.14, 49.48), "borne 1"))
    return bornes;
  };
  sourceBorne = {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [{
        type: "Feature",
        geometry: {
          type: "Point",
          coordinates: [0.14, 49.48]
        }
      }]
    }
  };

  bornes = this.instantiateBornes(1);
}
