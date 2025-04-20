import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/dashboard/dashboard.component').then((m) => m.DashboardComponent),
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products-list/products-list.component').then((m) => m.ProductsListComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () => import('./pages/product/product.component').then((m) => m.ProductComponent),
  },
  {
    path: 'orders',
    loadComponent: () => import('./pages/orders-list/orders-list.component').then((m) => m.OrdersListComponent),
  },
  {
    path: 'order/:id',
    loadComponent: () => import('./pages/order/order.component').then((m) => m.OrderComponent),
  },
  {
    path: 'users',
    loadComponent: () => import('./pages/users-list/users-list.component').then((m) => m.UsersListComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
