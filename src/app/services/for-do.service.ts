import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForDoService {

  private UrlGlobal=['http://10.2.47.15:5000']

  constructor(private http:HttpClient) {}

  public PostThing(thing){

    let url = `${this.UrlGlobal}/v1/things`

    return this.http.post(url,thing);
    

  }

  public getThings():Observable<object>{

    let url = `${this.UrlGlobal}/v1/things`
    return this.http.get(url);
  }
}
