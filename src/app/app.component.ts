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

  findNextBorne = (num: number) => {
    const positions = [];
    positions.push(new LngLat(49.478897, 0.125546));
    positions.push(new LngLat(49.481757, 0.108243));
    positions.push(new LngLat(49.485081, 0.116746));
    positions.push(new LngLat(49.491879, 0.093954));
    positions.push(new LngLat(49.467266, 0.189413));
    return (new Borne(positions[num], 'borne no ' + num.toString()));
  }

  instantiateBornes = () => {
    const bornes = [];
    for(let i = 0; i < 5; i++)
      bornes.push(this.findNextBorne(i))
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

  bornes = this.instantiateBornes();
}
