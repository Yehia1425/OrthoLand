
import { Component} from '@angular/core';



@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.html',
  styleUrl: './details.css',
})
export class Details  {
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
