import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Thing, contentThing } from '../interfaces/thing.interfaces';

@Injectable({
  providedIn: 'root'
})
export class ForDoService {

  private UrlGlobal=['http://10.2.47.12:5000']

  constructor(private http:HttpClient) {}

  public PostThing(thing){

    let url = `${this.UrlGlobal}/v1/things`

    return this.http.post(url,thing);
    

  }

  public getThings():Observable<object>{

    let url = `${this.UrlGlobal}/v1/things`
    return this.http.get(url);
  }

  public putThing(thing:contentThing){

    let url= `${this.UrlGlobal}/v1/things/${thing._id}`
    
    return this.http.put(url,thing);
  }

  public deleteThing(ThingId){
    let url= `${this.UrlGlobal}/v1/things/${ThingId}`

    return this.http.delete(url);
  }
}
