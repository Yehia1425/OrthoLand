import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./Pages/home/home').then(m => m.Home)
  },

  {
    path: 'categories',
    loadComponent: () =>
      import('./Pages/categories/categories').then(m => m.Categories)
  },
  {
    path: 'categories-offers',
    loadComponent: () =>
      import('./Pages/categories-offers/categories-offers').then(m => m.CategoriesOffers)
  },

  {
    path: 'products/:id',
    loadComponent: () =>
      import('./Pages/product/product').then(m => m.Product)
  },

  {
    path: 'product-details/:id',
    loadComponent: () =>
      import('./Pages/details/details').then(m => m.Details)
  },

  {
    path: 'cart',
    loadComponent: () =>
      import('./Pages/cart/cart').then(m => m.Cart)
  },

  {
    path: 'checkout',
    loadComponent: () =>
      import('./Pages/checkout/checkout').then(m => m.Checkout)
  },

  {
    path: 'contact',
    loadComponent: () =>
      import('./Pages/contact/contact').then(m => m.Contact)
  },

  {
    path: 'offers/:id',
    loadComponent: () =>
      import('./Pages/offers/offers').then(m => m.Offers)
  },

  {
    path: '**',
    redirectTo: 'home'
  }

];