import { Injectable, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>([]);

  constructor() {}
}
