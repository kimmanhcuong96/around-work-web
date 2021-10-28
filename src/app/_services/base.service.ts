import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs-compat/add/operator/map';
import 'rxjs/add/operator/map';
import { IService } from './interface.service';
import { Const } from '../_consts/const';

export const header = new Headers({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });

export const createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
    if (req) {
        Object.keys(req).forEach(key => {
            options = options.set(key, req[key]);
        });
    }
    return options;
};

@Injectable({
    providedIn: 'root'
})

/**
 * This class is base service. It contain function such as CRUD object to server.
 */
export class BaseService<T> implements IService<T> {
    searchUrl: string;
    uploadDataUrl: string;
    headers: HttpHeaders;
    apiUrl: string;
    httpClient: HttpClient;
    /**
     * Constructor of BaseService class, The base service will be inherited by other service classes
     * @param apiUrl : URL to call API from server
     * @param httpClient : provide methods to perform HTTP requests
     */
    constructor(httpClient: HttpClient) {
        this.searchUrl = 'search';
        this.uploadDataUrl = 'upload-data';
        this.headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' });
        this.httpClient = httpClient;
    }

    init(apiUrl: string) {
        this.apiUrl = apiUrl;
    }



    /**
     *method to get all record from a table in DB
     * @return list of data
     */
    getDataList(): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}`;
        return this.httpClient.get(url, { headers: new HttpHeaders().set('Cache-Control', 'no-cache'), observe: 'response' });
    }

    /**
     * method to get a record from a table in DB
     * @param id : id of the record to retrieve
     * @return  data
     */
    getRecordById(id: number): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}` + id;
        return this.httpClient.get(url, { observe: 'response' });
    }

    /**
     * method to get a list record that satisfies the given condition
     * @param condition condition to get data list
     * @return list of data
     */
    getDataListWithCon(condition?: string): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}/${this.searchUrl}?${condition}`;
        return this.httpClient.get(url, { observe: 'response' });
    }

    /**
     * add new record to database
     * @param jsonReq record to add
     * @return result of adding
     */
    addRecord(jsonReq: T): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}`;
        return this.httpClient.post(url, jsonReq, { observe: 'response' });
    }

    /**
     * method to update a record
     * @param jsonReq: object after updated
     * @param id: id of object will be updated
     * @return result of updating
     */
    updateRecord(jsonReq: T, id: any): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}${id}`;
        return this.httpClient.put(url, jsonReq, { observe: 'response' });
    }

    /**
     * delete 1 specified record
     * @param jsonReq record id
     * @return result of deleting
     */

    delRecord(jsonReq: number): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}/${jsonReq}`;
        return this.httpClient.delete(url, { observe: 'response' });
    }

    /**
     * delete multi specified record
     * @param jsonReq records id
     * @return result of deleting
     */
    delRecords(jsonReq: any): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}`;
        return this.httpClient.put(url, jsonReq, { observe: 'response' });
    }

    delDisable(jsonReq: any, addUrl?: string): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}${addUrl}`;
        const options = createRequestOption(jsonReq);
        return this.httpClient.put(url, jsonReq, { params: options, observe: 'response' });
    }

    /**
     * update existing record
     * @param jsonReq record information
     * @return result of updating
     */
    uploadData(jsonReq: any): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}/${this.uploadDataUrl}`;
        return this.httpClient.post(url, jsonReq, { observe: 'response' });
    }

    /**
     * query data with sql query
     * @param req :query params
     * @return list of data
     */
    query(req?: any): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}`;
        const options = createRequestOption(req);
        return this.httpClient.get<any[]>(url, { params: options, observe: 'response' });
    }

    /**
     * query data with list sql query
     * @param req query params
     * @param addUrl the URL appended to the base URL
     */
    queryAddUrl(req?: any, addUrl?: string): Observable<HttpResponse<any>> {
        const url = `${this.apiUrl}${addUrl}`;
        const options = createRequestOption(req);
        return this.httpClient.get(url, { params: options, observe: 'response' });
    }

    loadImage(addUrl: string): Observable<any> {
        const url = `${this.apiUrl}${addUrl}`;
        return this.httpClient
            // load the image as a blob
            .get(url, { responseType: 'blob' })
            // create an object url of that blob that we can use in the src attribute
            .map(e => URL.createObjectURL(e));
    }

    loadImageBlob(addUrl: string): Observable<any> {
        const url = `${this.apiUrl}${addUrl}`;
        return this.httpClient
            // load the image as a blob
            .get(url, { responseType: 'blob' });
    }

    public uploadFile(addUrl: string, file: any, saveFile: any) {
        const url = `${this.apiUrl}${addUrl}`;
        // this will be the our resulting map
        // create a new multipart-form for every file
        const formData: FormData = new FormData();
        formData.append('file', file, Const.BLOB_DEFAULT_FILE_NAME);
        formData.append('save_file', saveFile.toString());
        const options = { headers: new HttpHeaders().set('Access-Control-Allow-Origin', '*'), reportProgress: true };
        return this.httpClient.put(url, formData, options);
    }
}
