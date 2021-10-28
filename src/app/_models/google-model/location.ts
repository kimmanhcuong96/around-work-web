import { Marker } from "./marker";

export interface Location {
    latitude: number;
    longitude: number;
    mapType?: any;
    zoom?: number;
    markers: Array<Marker>;
}