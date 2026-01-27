import { Component, HostListener } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {


  cartCount = 0;

  constructor() {
    // مؤقتًا
    this.cartCount = 3;
  }

 isScrolling: boolean = false;

 @HostListener('window:scroll', [])
 onWindowScroll() {
   this.isScrolling = window.scrollY > 0;
 }

}
