import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersServices } from '../../Core/services/OrdersServices/orders-services';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { IOrderItem } from '../../Shared/interfaces/iorder-item';
import { IOrder } from '../../Shared/interfaces/iorder';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout {

  private orderService = inject(OrdersServices);
  private cartService = inject(CartServices);

  cartItems = this.cartService.cartItems;

  checkoutForm = new FormGroup({

    userName: new FormControl('',[
      Validators.required
    ]),

    userNumber: new FormControl('',[
      Validators.required
    ]),

    address: new FormControl('',[
      Validators.required
    ]),

    notes: new FormControl('')

  });


submitOrder(){

  if(this.checkoutForm.invalid){
    return;
  }

  const cartItems = this.cartItems();

  if(cartItems.length === 0){
    console.log("Cart Empty");
    return;
  }

  const formValue = this.checkoutForm.value;

  const totalPrice = cartItems.reduce(
    (total,item)=> total + (item.price * item.quantity),0
  );

  const items: IOrderItem[] = cartItems.map(item => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    description: item.description ?? '',
    itemTotalPrice: item.price * item.quantity,
    offerApplied: false
  }));

  const order: IOrder = {

    userName: formValue.userName!,
    userNumber: formValue.userNumber!,
    orderDate: new Date().toISOString().split('T')[0],
    totalPrice: totalPrice,
    address: formValue.address!,
    notes: formValue.notes ?? '',
    items: items

  };

  this.orderService.createOrder(order).subscribe({

    next:(res)=>{
      console.log("Order Created",res);
      this.cartService.cartItems.set([]);
    },

    error:(err)=>{
      console.log(err);
    }

  });

}

}