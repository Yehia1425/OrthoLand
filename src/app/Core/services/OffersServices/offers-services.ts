import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersServices {
   constructor(private httpClient:HttpClient) {}

   GetAllOffers(id:number):Observable<any>{
    return this.httpClient.get(`https://ourtholand.runasp.net/GetActiveOffers/${id}`);
   }
}
