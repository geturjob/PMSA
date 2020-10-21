import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private _http: HttpClient) { }

  getClientList():any[]{
    return [
      {name :'Social Accounts', value:'social'},
      {name :'Banks', value:'bank'},
      {name :'Others', value:'others'},
    ]
  }

  sendPostRequest(url: string, body: any) {
    //var requestBody = JSON.stringify(body);
    return this._http.post('http://localhost:3000' + url, body, {
      headers: new HttpHeaders({
        'content-type': 'application/json'
      })
    })
  }

  sendGetRequest(url: string) {
    return this._http.get('http://localhost:3000' + url);
  }
}
