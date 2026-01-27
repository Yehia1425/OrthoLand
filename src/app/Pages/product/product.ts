import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-product',
  imports: [],
  templateUrl: './product.html',
  styleUrl: './product.css',
})
export class Product {
  constructor(private router: Router) {}

  goToDetails() {
    this.router.navigate(['/product-details']);
  }
}
