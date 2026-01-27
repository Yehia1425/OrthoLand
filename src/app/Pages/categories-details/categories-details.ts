import { Component } from '@angular/core';

@Component({
  selector: 'app-categories-details',
  imports: [],
  templateUrl: './categories-details.html',
  styleUrl: './categories-details.css',
})
export class CategoriesDetails {
 quantity = 1;

  increase(): void {
    this.quantity++;
  }

  decrease(): void {
    if (this.quantity > 1) this.quantity--;
  }

  addToCart(): void {
    if (typeof window !== 'undefined') {
      alert(`تم إضافة ${this.quantity} من فرشاة تقويم ناعمة إلى السلة`);
    }
    this.quantity = 1;
  }
}
