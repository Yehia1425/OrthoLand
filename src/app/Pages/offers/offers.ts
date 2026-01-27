import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-offers',
  imports: [],
  templateUrl: './offers.html',
  styleUrl: './offers.css',
})
export class Offers {
  constructor(private Router: Router) {}

  goToDetails() {
    this.Router.navigate(['/product-details']);
  }
}
