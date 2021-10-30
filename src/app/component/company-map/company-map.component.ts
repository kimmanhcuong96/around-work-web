import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Location } from '../../_models/google-model/location';
import { MapService } from 'src/app/_services/map.service';

@Component({
  selector: 'app-company-map',
  templateUrl: './company-map.component.html',
  styleUrls: ['./company-map.component.scss']
})
export class CompanyMapComponent implements OnInit {
  @ViewChild('infoPanel') infoPanel: ElementRef;
  title = 'My first AGM project';
  location: Location;
  user: any;

  map: google.maps.Map;
  infoWindow: google.maps.InfoWindow;
  isShowCompanyPanel = false;
  constructor(private mapService: MapService) {

  }

  ngOnInit(): void {
    this.location = {
      latitude: 0,
      longitude: 0,
      mapType: "TERRAIN",
      zoom: 15,
      markers: [
        {
          lat: 0,
          lng: 0
        }
      ],
    };
    this.user = {
      lat: 0,
      lng: 0
    }
    // this.mapService.getUserLocation().subscribe(res => {
    //   console.log('response:  ', res);
    // }, err => {
    //   console.log(err);
    // });
    if (!navigator.geolocation) {
      console.log('not support location');
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('xx: ', position.coords);
        this.user = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
      
        this.updatePositionWhenUserMove();
      });
    }
  }

  updatePositionWhenUserMove() {
    navigator.geolocation.watchPosition((position) => {
      console.log('xx: ', position.coords);
    }, (err) => {

    })
  }

  addMarker(lat: number, lng: number) {
    // this.location.markers.push({
    //   lat,
    //   lng
    // });
    // this.isShowCompanyPanel = !this.isShowCompanyPanel;
  }

  logSampleData(event: any) {
    console.log('data: ', event);
  }

}
