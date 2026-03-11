import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { IBasket } from '../../../Shared/interfaces/ibasket';
import { IBasketItem } from '../../../Shared/interfaces/ibasket-item';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CartServices {
 private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);
  cartNumber:WritableSignal<number>=signal(0)

  cartItems = signal<IBasketItem[]>([]);

  basketId: string = '';

  constructor(){

    if (isPlatformBrowser(this.platformId)) {

      const stored = localStorage.getItem('basketId');

      if (stored) {
        this.basketId = stored;
      } else {
        this.basketId = crypto.randomUUID();
        localStorage.setItem('basketId', this.basketId);
      }

    }

  }

  createOrUpdateBasket(basket: IBasket) {
    return this.http.post(
      'https://ourtholand.runasp.net/CreateOrUpdateBasket',
      basket
    );
  }

    deleteBasket(basketId:string){
    return this.http.delete(
      `https://ourtholand.runasp.net/DeleteBasket/${basketId}`
    );
  }
}
