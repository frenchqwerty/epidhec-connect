import {LngLat} from "mapbox-gl";

export class Borne {
  pos: LngLat;
  name: string;
  capacity: number;

  constructor(pos: LngLat, name: string) {
    this.name = name;
    this.pos = pos;
    this.capacity = 100;
  }
}
