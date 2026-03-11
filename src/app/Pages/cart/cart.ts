import { Component, inject } from '@angular/core';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { IBasketItem } from '../../Shared/interfaces/ibasket-item';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  imports: [RouterLink],
})
export class Cart {

  private cartService = inject(CartServices);

  cartItems = this.cartService.cartItems;
  basketId = this.cartService.basketId;

  BaseUrl = "https://ourtholand.runasp.net";

  // نفس طريقة product page
  getImageUrl(img: string | undefined | null) {

    if (!img) return '';

    const cleanName = img.replace(/\s+/g, '_');

    return `${this.BaseUrl}/api/Attachment/get-image/${cleanName}`;
  }

  updateBasket() {

    const basket = {
      id: this.basketId,
      items: this.cartItems()
    };

    this.cartService.createOrUpdateBasket(basket).subscribe({
      next: (res) => console.log("Basket Updated", res),
      error: (err) => console.log(err)
    });

  }

  removeItem(productId: number) {

    this.cartItems.update(items =>
      items.filter(x => x.id !== productId)
    );

    this.updateBasket();
  }

  increaseQuantity(item: IBasketItem) {

    this.cartItems.update(items =>
      items.map(x =>
        x.id === item.id
          ? { ...x, quantity: x.quantity + 1 }
          : x
      )
    );

    this.updateBasket();
  }

  decreasequantity(item: IBasketItem) {

    this.cartItems.update(items =>
      items.map(x =>
        x.id === item.id && x.quantity > 1
          ? { ...x, quantity: x.quantity - 1 }
          : x
      )
    );

    this.updateBasket();
  }

  clearCart() {

    this.cartService.deleteBasket(this.basketId).subscribe({
      next: () => {
        console.log("Basket Deleted");
        this.cartItems.set([]);
      },
      error: (err) => console.log(err)
    });

  }

  getTotalPrice() {

    return this.cartItems()
      .reduce((total, item) => total + (item.price * item.quantity), 0);

  }

}