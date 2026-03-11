import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategories } from '../../../Shared/interfaces/icategories';

@Injectable({
  providedIn: 'root',
})
export class ProductServicesandCategories {
    constructor(private httpClient:HttpClient) {}


    GetProductById(id:number):Observable<any>{
      return this.httpClient.get(`https://ourtholand.runasp.net/GetProductById/${id}`);
    }

    GetGetProductsByCategoryId(id:any):Observable<any>{
      return this.httpClient.get(`https://ourtholand.runasp.net/GetProductsByCategoryId/${id}`);
    }


GetAllCategories(): Observable<ICategories[]> {
  return this.httpClient.get<ICategories[]>('https://ourtholand.runasp.net/GetCategories');
}



}
