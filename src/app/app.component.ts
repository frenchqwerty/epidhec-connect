import {Component} from '@angular/core';
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
  positions = {
    'type': 'geojson',
    'data': {
      'type': 'FeatureCollection',
      'features': [
        {
          'type': "Feature",
          'geometry': {
            'type': 'Point',
            'coordinates': [0.125546, 49.478897]
          },
          'properties': {
            'marker-color': '#3bb2d0',
            'marker-size': 'large',
            'marker-symbol': '1'
          }
        },
        {
          'type': "Feature",
          'geometry': {
            'type': 'Point',
            'coordinates': [0.108243, 49.481757]
          },
          'properties': {
            'marker-color': '#3bb2d0',
            'marker-size': 'large',
            'marker-symbol': '2'
          }
        },
        {
          'type': "Feature",
          'geometry': {
            'type': 'Point',
            'coordinates': [0.116746, 49.485081]
          },
          'properties': {
            'marker-color': '#3bb2d0',
            'marker-size': 'large',
            'marker-symbol': '3'
          }
        },
        {
          'type': "Feature",
          'geometry': {
            'type': 'Point',
            'coordinates': [0.093954, 49.491879]
          },
          'properties': {
            'marker-color': '#3bb2d0',
            'marker-size': 'large',
            'marker-symbol': '4'
          }
        },
        {
          'type': "Feature",
          'geometry': {
            'type': 'Point',
            'coordinates': [0.189413, 49.467266]
          },
          'properties': {
            'marker-color': '#3bb2d0',
            'marker-size': 'large',
            'marker-symbol': '5'
          }
        }
      ]
    }
  };
}
