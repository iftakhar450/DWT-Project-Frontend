import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  host: any = environment.host;
  constructor(private http: HttpClient) { }
  // Post method 
  post(url, data) {
    console.log(this.host + url)
    // console.log(data)
    return this.http.post<any>(this.host + url, data);

  }

  // Get method 
  get(url) {
    return this.http.get<any>(this.host + url);
  }

  //Update method
  update(url, data) {

    console.log(this.host + url)
    return this.http.put<any>(this.host + url, data);

  }

  // Delete method
  delete(url) {
    return this.http.delete<any>(this.host + url);
  }
}
