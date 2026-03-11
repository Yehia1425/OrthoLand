import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IOrder } from '../../../Shared/interfaces/iorder';

@Injectable({
  providedIn: 'root',
})
export class OrdersServices {
  private http = inject(HttpClient);

  BaseUrl = "https://ourtholand.runasp.net";

  createOrder(order:IOrder){
    return this.http.post(`${this.BaseUrl}/CreateOrder`,order);
  }
}
