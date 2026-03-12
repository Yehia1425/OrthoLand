import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './checkout.html',
})
export class Checkout {

  private router = inject(Router);
  private toastr = inject(ToastrService);

  checkoutForm = new FormGroup({

    userName: new FormControl('',[
      Validators.required
    ]),

    address: new FormControl('',[
      Validators.required
    ]),

    notes: new FormControl('')

  });


  goToPayment(){

    if(this.checkoutForm.invalid){

      this.toastr.warning("Please fill required fields");
      return;

    }

    const draftOrder = {

      userName: this.checkoutForm.value.userName,
      address: this.checkoutForm.value.address,
      notes: this.checkoutForm.value.notes

    };

    localStorage.setItem("draftOrder", JSON.stringify(draftOrder));

    this.router.navigate(['/payment']);

  }
  }

