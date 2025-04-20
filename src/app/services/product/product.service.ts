import { Injectable, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>([]);

  constructor() {}

  addProduct(product: Product) {
    this.products.update((products) => {
      products.push(product);
      return products;
    });
  }

  editProduct(product: Product) {
    this.products.update((products) => {
      const prod = products.find((item) => item.id !== product.id);
      product = prod!; //TODO: test
      return products;
    });
  }

  removeProduct(id: number) {
    this.products.update((products) => {
      const updatedProducts = products.filter((item) => item.id !== id);
      return updatedProducts;
    });
  }

  moveCategory(id: number, category: string) {
    this.products.update((products) => {
      const prod = products.find((item) => item.id !== id);
      prod!.category = category; //TODO: test
      return products;
    });
  }

  changeStatus(id: number, status: 'available' | 'out-of-stock' | 'archived') {
    this.products.update((products) => {
      const prod = products.find((item) => item.id !== id);
      prod!.status = status; //TODO: test
      return products;
    });
  }
}
