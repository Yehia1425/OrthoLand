import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOffer } from '../../../Shared/interfaces/ioffer';

@Injectable({
  providedIn: 'root',
})
export class OffersServices {
   constructor(private httpClient:HttpClient) {}

   GetAllOffers(id:number):Observable<any>{
    return this.httpClient.get(`https://ourtholand.runasp.net/GetActiveOffers/${id}`);
   }

   GetOfferByProductId(productId:number){
  return this.httpClient.get<IOffer>(`https://ourtholand.runasp.net/GetOfferByProductId/${productId}`);
}
}
