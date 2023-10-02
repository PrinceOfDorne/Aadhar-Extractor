import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  baseUrl = `${environment.server_URL}`;

  constructor(private http : HttpClient) { }
 
  getProcessedData(file : File){
      let headers = new Headers();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      return this.http.post(`${this.baseUrl}/process_image`, file, { observe: 'response' });
  }

  InsertData(name : string, gender : string, dob : string, image : File){
      let queryParams = new HttpParams();

      queryParams = queryParams.append("name", name);
      queryParams = queryParams.append("gender", gender);
      queryParams = queryParams.append("dob", dob);

      return this.http.post(`${this.baseUrl}/insert_data`, image, {params : queryParams, observe : "response"});
  }
}
