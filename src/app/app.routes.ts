import { Routes } from '@angular/router';

export const routes: Routes = [

    {
    path: 'home',
    loadComponent: () =>
      import('./Pages/home/home').then(m => m.Home)
  },


     {
    path: '',
    redirectTo: 'home', // افتراضي يفتح Home Page
    pathMatch: 'full'
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./Pages/product/product').then(m => m.Product)
  },
  {
    path: 'product-details',
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
    path: 'categories',
    loadComponent: () =>
      import('./Pages/categories/categories').then(m => m.Categories)
  },
    {
    path: 'categories-details/:id',
    loadComponent: () =>
      import('./Pages/categories-details/categories-details').then(m => m.CategoriesDetails)
  },
  {
    path: 'offers',
    loadComponent: () =>
      import('./Pages/offers/offers').then(m => m.Offers)
  },
  {
    path: '**', // أي مسار غير موجود يروح Products Page
    redirectTo: 'products'
  }
];
