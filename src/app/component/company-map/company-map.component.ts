import { Component, OnInit } from '@angular/core';
// import { Loader } from '@googlemaps/js-api-loader';

@Component({
  selector: 'app-company-map',
  templateUrl: './company-map.component.html',
  styleUrls: ['./company-map.component.scss']
})
export class CompanyMapComponent implements OnInit {
  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;

  constructor() { }

  ngOnInit(): void {
    // let loader = new Loader(
    //   {
    //     apiKey: 'AIzaSyD8S609SZ4Ras2gzbhd51ls1DzHzt_5miQ'
    //   }
    // );
    // loader.load().then(() => {
    //   new google.maps.Map(document.getElementById("dy-gg") as Element, {
    //     center: { lat: 51, lng: 6.7 },
    //   })
    // });
  }

}
