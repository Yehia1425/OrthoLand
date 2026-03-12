import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersServices } from '../../Core/services/OrdersServices/orders-services';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { IOrderItem } from '../../Shared/interfaces/iorder-item';
import { IOrder } from '../../Shared/interfaces/iorder';
import { ToastrService } from 'ngx-toastr';

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
  private toastr = inject(ToastrService);

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

    notes: new FormControl(''),

    paymentWay: new FormControl('',[
      Validators.required
    ])

  });


submitOrder(){

  if(this.checkoutForm.invalid){

    this.toastr.warning("Please fill all required fields");

    return;
  }

  const cartItems = this.cartItems();

  if(cartItems.length === 0){

    this.toastr.error("Your cart is empty");

    return;
  }

  const formValue = this.checkoutForm.value;

  let totalPrice = 0;

  const items: IOrderItem[] = cartItems.map(item => {

    let itemTotalPrice = item.price * item.quantity;
    let offerApplied = false;

    if(item.buyQuantity && item.getQuantity){

      offerApplied = true;

      const group = item.buyQuantity + item.getQuantity;

      const offerCount = Math.floor(item.quantity / group);

      const paidQuantity =
        (offerCount * item.buyQuantity) +
        (item.quantity % group);

      itemTotalPrice = paidQuantity * item.price;

    }

    totalPrice += itemTotalPrice;

    return {

      productId: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      description: item.description ?? '',
      itemTotalPrice: itemTotalPrice,
      offerApplied: offerApplied

    };

  });

  const order: IOrder = {

    userName: formValue.userName!,
    userNumber: formValue.userNumber!,
    orderDate: new Date().toISOString().split('T')[0],
    totalPrice: totalPrice,
    address: formValue.address!,
    notes: formValue.notes ?? '',
    paymentWay: Number(formValue.paymentWay),
    items: items

  };

  this.orderService.createOrder(order).subscribe({

    next:(res)=>{

      console.log("Order Created",res);

      this.toastr.success("Order placed successfully 🎉");

      this.cartService.cartItems.set([]);

      this.checkoutForm.reset();

    },

    error:(err)=>{

      console.log(err);

      this.toastr.error("Failed to place order");

    }

  });

}

}