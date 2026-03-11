import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [

  {
    path: '',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'categories',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'categories-offers',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'cart',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'checkout',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'contact',
    renderMode: RenderMode.Prerender
  },

  // dynamic routes
  {
    path: 'products/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'product-details/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'offers/:id',
    renderMode: RenderMode.Server
  },

  {
    path: '**',
    renderMode: RenderMode.Server
  }

];