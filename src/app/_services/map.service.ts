import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpPath } from '../_consts/http-path';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  httpClient: HttpClient;
  constructor(httpClient: HttpClient) {
    // super(httpClient);
    // this.init(HttpPath.USER_LOCATION_ROUTE);
    this.httpClient = httpClient;
  }

  getUserLocation() {
    const accessKey = '';
    let url = `http://api.ipapi.com/api/check?access_key=${accessKey}`;
    url = 'https://ipapi.co/8.8.8.8/json/'
    return this.httpClient.get(url, { headers: new HttpHeaders().set('Cache-Control', 'no-cache'), observe: 'response' });
  }

  getUserIpFromExternal() {
    return this.httpClient.get(HttpPath.IP_SITE, { observe: 'response' });
  }

  getLocationFromExternalByIp(ip: string, acesssKey: string) {
    let url = `http://api.ipstack.com/${ip}?access_key=${acesssKey}`
    return this.httpClient.get(url, { observe: 'response' });
  }
}
