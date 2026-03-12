import { Component, computed, HostListener, inject, OnInit, PLATFORM_ID, Signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CartServices } from '../../Core/services/CartServcies/cart-services';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar  {


  platformId = inject(PLATFORM_ID);

  isBrowser = isPlatformBrowser(this.platformId);


 isScrolling: boolean = false;

 @HostListener('window:scroll', [])
 onWindowScroll() {
   this.isScrolling = window.scrollY > 0;
 }

}
