import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Location } from '../../_models/google-model/location';

@Component({
  selector: 'app-company-map',
  templateUrl: './company-map.component.html',
  styleUrls: ['./company-map.component.scss']
})
export class CompanyMapComponent implements OnInit {
  @ViewChild('infoPanel') infoPanel: ElementRef;
  title = 'My first AGM project';
  location: Location;
  mapClickListener: any;

  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  isShowCompanyPanel = false;
  constructor() {

  }

  ngOnInit(): void {
    this.location = {
      latitude: 0,
      longitude: 0,
      mapType: "TERRAIN",
      zoom: 5,
      markers: [
        {
          lat: 0,
          lng: 0
        }
      ]
    }
  }

  addMarker(lat: number, lng: number) {
    this.location.markers.push({
      lat,
      lng
    });
    this.isShowCompanyPanel = !this.isShowCompanyPanel;
    this.initMap();
  }

  logSampleData(event: any) {
    console.log('data: ', event);
  }


  initMap(): void {
    console.log('init map');
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 6,
    });
    this.infoWindow = new google.maps.InfoWindow();

    const locationButton = document.createElement("button");

    locationButton.textContent = "Pan to Current Location";
    locationButton.classList.add("custom-map-control-button");

    this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };

          this.infoWindow.setPosition(pos);
          this.infoWindow.setContent("Location found.");
          this.infoWindow.open(this.map);
          this.map.setCenter(pos);
        },
        () => {
          this.handleLocationError(true, this.infoWindow, this.map.getCenter()!);
        }
      );
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, this.infoWindow, this.map.getCenter()!);
    }
  }

  handleLocationError(
    browserHasGeolocation: boolean,
    infoWindow: google.maps.InfoWindow,
    pos: google.maps.LatLng
  ) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(
      browserHasGeolocation
        ? "Error: The Geolocation service failed."
        : "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(this.map);
  }
}
