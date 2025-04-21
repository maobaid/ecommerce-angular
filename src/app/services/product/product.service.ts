import { Injectable, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';
import { CATEGORIES, Category } from '../../data/category';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  constructor() {
    this.products.set(PRODUCTS);
    this.categories.set(CATEGORIES);
  }

  addCategory(category: Category) {
    category.id = this.categories().length + 1;
    this.categories.update((categories) => {
      categories.push(category);
      return categories;
    });
  }

  editCategory(category: Category) {
    this.categories.update((categories) => {
      return categories.map((item) => (item.id === category.id ? category : item));
    });
  }

  removeCategory(id: number) {
    this.categories.update((categories) => {
      return categories.filter((item) => item.id !== id);
    });
  }

  addProduct(product: Product) {
    product.id = this.products().length + 1;
    product.createdAt = new Date().toISOString();
    product.updatedAt = new Date().toISOString();
    this.products.update((products) => {
      products.push(product);
      return products;
    });
    console.log(this.products());
  }

  editProduct(product: Product) {
    this.products.update((products) => {
      return products.map((item) => (item.id === product.id ? product : item));
    });
  }

  removeProduct(id: number) {
    this.products.update((products) => {
      return products.filter((item) => item.id !== id);
    });
  }

  getProductCategory(id: number) {
    return this.categories().find((cat) => cat.id === id)?.name;
  }

  moveCategory(id: number, categoryId: number) {
    this.products.update((products) => {
      return products.map((item) => (item.id === id ? { ...item, category: categoryId } : item));
    });
    console.log(this.products());
  }

  changeStatus(id: number, status: 'available' | 'out-of-stock' | 'archived') {
    this.products.update((products) => {
      const prod = products.find((item) => item.id !== id);
      prod!.status = status; //TODO: test
      return products;
    });
  }
}
