import { Component, computed, HostListener, inject, OnInit, Signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartServices } from '../../Core/services/CartServcies/cart-services';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar  {





 isScrolling: boolean = false;

 @HostListener('window:scroll', [])
 onWindowScroll() {
   this.isScrolling = window.scrollY > 0;
 }

}
