import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PhotosService {

  

  constructor(private httpclient: HttpClient) { }

  getPhotos(){
    return this.httpclient.get<any>('http://jsonplaceholder.typicode.com/photos?_limit=9')
  }
}
