import { Routes } from '@angular/router';

export const routes: Routes = [
  
  {
    path: '',
    loadChildren: () =>
      import('./share/ui/home/home-route'),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./share/ui/home/home-route'),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.routes'),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/features/product-shell/product-route'),
  },
  {
    path: 'cart',
    loadChildren: () =>
      import('./cart/cart.routes')
  },

  {
    path: '**',
    redirectTo: '',
  },
];
