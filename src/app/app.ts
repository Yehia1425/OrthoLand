import { FlowbiteService } from './Core/services/flowbite/flowbite';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { Home } from "./Pages/home/home";
import { Navbar } from "./Layouts/navbar/navbar";
import { Footer } from "./Layouts/footer/footer";
import { Product } from "./Pages/product/product";
import { Details } from "./Pages/details/details";
import { Checkout } from "./Pages/checkout/checkout";
import { Cart } from './Pages/cart/cart';
import { Categories } from "./Pages/categories/categories";
import { Offers } from "./Pages/offers/offers";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Home, Navbar, Footer, Product, Details, Checkout, Cart, Categories, Offers],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('OrthoLand');
   constructor(private FlowbiteService: FlowbiteService) {}

  ngOnInit(): void {
    this.FlowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });
  }
}
