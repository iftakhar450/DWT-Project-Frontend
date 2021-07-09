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
    if (url == '/login') {
      return this.http.post<any>(this.host + url, data);
    } else {
      const headers = { 'authorization': JSON.parse(localStorage.getItem('user')).token ? JSON.parse(localStorage.getItem('user')).token : '' }
      // console.log(headers)
      return this.http.post<any>(this.host + url, data, { headers: headers });
    }


  }

  // Get method 
  get(url) {
    const headers = { 'authorization': JSON.parse(localStorage.getItem('user')).token }
    return this.http.get<any>(this.host + url, { 'headers': headers });
  }

  //Update method
  update(url, data) {
    const headers = { 'authorization': JSON.parse(localStorage.getItem('user')).token }
    console.log(this.host + url)
    return this.http.put<any>(this.host + url, data, { 'headers': headers });

  }

  // Delete method
  delete(url) {
    const headers = { 'authorization': JSON.parse(localStorage.getItem('user')).token }
    return this.http.delete<any>(this.host + url, { 'headers': headers });
  }
}
