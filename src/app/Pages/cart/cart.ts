import { Component, inject } from '@angular/core';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { IBasketItem } from '../../Shared/interfaces/ibasket-item';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.html',
  styleUrl: './cart.css',
  imports: [RouterLink],
})
export class Cart {

  private cartService = inject(CartServices);
  private toastr = inject(ToastrService);

  cartItems = this.cartService.cartItems;
  basketId = this.cartService.basketId;

  BaseUrl = "https://ourtholand.runasp.net";


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
      next: () => {
        this.toastr.success("Cart updated successfully");
      },
      error: () => {
        this.toastr.error("Error updating cart");
      }
    });

  }


  removeItem(productId: number) {

    this.cartItems.update(items =>
      items.filter(x => x.id !== productId)
    );

    this.updateBasket();

    this.toastr.warning("Product removed from cart");

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

    this.toastr.info("Quantity increased");

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

    this.toastr.info("Quantity decreased");

  }


  clearCart() {

    this.cartService.deleteBasket(this.basketId).subscribe({
      next: () => {

        this.cartItems.set([]);

        this.toastr.success("Cart cleared successfully");

      },
      error: () => {

        this.toastr.error("Error clearing cart");

      }
    });

  }


  getItemTotal(item: IBasketItem) {

    let total = item.price * item.quantity;

    if (item.buyQuantity && item.getQuantity) {

      const group = item.buyQuantity + item.getQuantity;

      const offerCount = Math.floor(item.quantity / group);

      const paidQuantity =
        (offerCount * item.buyQuantity) +
        (item.quantity % group);

      total = paidQuantity * item.price;

    }

    return total;

  }


  getTotalPrice() {

    return this.cartItems().reduce((total, item) => {

      let itemTotal = item.price * item.quantity;

      if (item.buyQuantity && item.getQuantity) {

        const group = item.buyQuantity + item.getQuantity;

        const offerCount = Math.floor(item.quantity / group);

        const paidQuantity =
          (offerCount * item.buyQuantity) +
          (item.quantity % group);

        itemTotal = paidQuantity * item.price;

      }

      return total + itemTotal;

    }, 0);

  }

}