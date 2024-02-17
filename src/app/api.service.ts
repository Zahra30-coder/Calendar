import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  public readonly url = 'http://localhost:3000';
  public eventPath = '/ets';
 

  events: Event[] = [];

  
  constructor(private http: HttpClient) {}

  public getEt(): Observable<Event[]> {
    return this.http.get<Event[]>(this.url + this.eventPath);
  }
   
  public addEt(event: Event): Observable<any> {
    return this.http.post<Event>(this.url + this.eventPath,event);
  }
  
  getEtById(Id: any) {
    return this.http.get<Event>(this.url + this.eventPath + "/" + Id);
  }

  updateEtData(Id: any, blog: any) {
    
    return this.http.put<Event>(this.url + this.eventPath + "/" + Id, blog);
  }


}
