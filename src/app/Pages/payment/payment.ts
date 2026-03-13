import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrdersServices } from '../../Core/services/OrdersServices/orders-services';
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { IOrder } from '../../Shared/interfaces/iorder';
import { IOrderItem } from '../../Shared/interfaces/iorder-item';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment.html',
})
export class Payment implements OnInit {

  private orderService = inject(OrdersServices);
  private cartService = inject(CartServices);
  private toastr = inject(ToastrService);
  private router = inject(Router);

  cartItems = this.cartService.cartItems;

  checkoutData:any;

  paymentForm = new FormGroup({

phone: new FormControl('',[
  Validators.required,
  Validators.pattern(/^01[0125][0-9]{8}$/)
]),

    amount: new FormControl('',[
      Validators.required
    ]),

    paymentWay: new FormControl('',[
      Validators.required
    ])

  });


  ngOnInit(){

    const data = localStorage.getItem("draftOrder");

    if(data){

      this.checkoutData = JSON.parse(data);

    }else{

      this.toastr.error("Checkout data missing");
      this.router.navigate(['/checkout']);

    }

  }


  submitOrder(){

    if(this.paymentForm.invalid){

      this.toastr.warning("Please fill all fields");
      return;

    }

    const cartItems = this.cartItems();

    if(cartItems.length === 0){

      this.toastr.error("Cart is empty");
      return;

    }

    const formValue = this.paymentForm.value;

    let totalPrice = 0;

    const items:IOrderItem[] = cartItems.map(item=>{

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

      return{

        productId:item.id,
        name:item.name,
        price:item.price,
        quantity:item.quantity,
        description:item.description ?? '',
        itemTotalPrice:itemTotalPrice,
        offerApplied:offerApplied

      }

    });


    const order:IOrder={

      userName:this.checkoutData.userName,
      userNumber:formValue.phone!,
      address:this.checkoutData.address,
      notes:this.checkoutData.notes ?? '',
      orderDate:new Date().toISOString().split('T')[0],
      totalPrice:totalPrice,
      paymentWay:Number(formValue.paymentWay),
      transferredAmount:Number(formValue.amount),
      items:items

    }

    this.orderService.createOrder(order).subscribe({

      next:()=>{

        this.toastr.success("Order placed successfully ");

        this.cartService.cartItems.set([]);

        localStorage.removeItem("draftOrder");

        this.router.navigate(['/']);

      },

      error:()=>{

        this.toastr.error("Failed to place order");

      }

    })

  }

}