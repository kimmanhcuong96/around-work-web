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
      zoom: 12,
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
    /**
     * update location by geolocation
     */
    // if (!navigator.geolocation) {
    //   console.log('not support location');
    // } else {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     console.log('xx: ', position.coords);
    //     this.user = {
    //       lat: position.coords.latitude,
    //       lng: position.coords.longitude
    //     };

    //     this.updatePositionWhenUserMove();
    //   });
    // }
    /**
     * update location from external resource 
     */
    this.getUserIpAndLocationFromExternal()
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

  getUserIpAndLocationFromExternal() {
    this.mapService.getUserIpFromExternal().subscribe(response => {
      const body = response.body as any;
      const ip = body.ip;
      console.log('ip: ', ip);
      this.mapService.getLocationFromExternalByIp(ip, '3cc8a59bb976fb5ddbee7d5c518e434d').subscribe(response => {
        const res = response.body as any;
        this.user = {
          lat: res.latitude,
          lng: res.longitude
        };
      }, locErr => {
        console.log('error when get location from External source: ', locErr);
        this.getUserLocationByGeolocation();
      });

    }, err => {
      console.log('error when get IP: ', err);
      this.getUserLocationByGeolocation();
    });
  }

  getUserLocationByGeolocation() {
    if (!navigator.geolocation) {
      console.log('not support location');
    } else {
      navigator.geolocation.getCurrentPosition(position => {
        this.user = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        this.updatePositionWhenUserMove();
      });
    }
  }
}
