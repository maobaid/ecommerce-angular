import { Injectable, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';
import { CATEGORIES, Category } from '../../data/category';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products = signal<Product[]>([]);
  categories = signal<Category[]>([]);

  constructor(private _storageService: StorageService) {
    this.products.set(PRODUCTS);
    this.categories.set(CATEGORIES);
  }

  saveProducts() {
    this._storageService.saveData('products', this.products());
  }

  loadProducts() {
    const storedProducts = this._storageService.getData('products');
    if (storedProducts) {
      this.products.set(storedProducts);
    } else {
      this.products.set(PRODUCTS);
    }
  }

  loadCategories() {
    const storedCategories = this._storageService.getData('categories');
    if (storedCategories) {
      this.categories.set(storedCategories);
    }
  }

  saveCategories() {
    this._storageService.saveData('categories', this.categories());
  }

  addCategory(category: Category) {
    category.id = this.categories().length + 1;
    this.categories.update((categories) => {
      categories.push(category);
      return categories;
    });
    this.saveCategories();
  }

  editCategory(category: Category) {
    this.categories.update((categories) => {
      return categories.map((item) => (item.id === category.id ? category : item));
    });
    this.saveCategories();
  }

  removeCategory(id: number) {
    this.categories.update((categories) => {
      return categories.filter((item) => item.id !== id);
    });
    this.saveCategories();
  }

  addProduct(product: Product) {
    product.id = this.products().length + 1;
    product.createdAt = new Date().toISOString();
    product.updatedAt = new Date().toISOString();
    product.status = 'available';
    this.products.update((products) => [...products, product]);
    console.log(this.products());
    this.saveProducts();
  }

  editProduct(product: Product) {
    this.products.update((products) => {
      return products.map((item) =>
        item.id === product.id
          ? product.stock === 0
            ? { ...product, status: 'out-of-stock' }
            : product.status === 'out-of-stock'
            ? { ...product, stock: 0 }
            : product
          : item
      );
    });
    this.saveProducts();
  }

  removeProduct(id: number) {
    this.products.update((products) => {
      return products.filter((item) => item.id !== id);
    });
    this.saveProducts();
  }

  getProductCategory(id: number) {
    return this.categories().find((cat) => cat.id === id)?.name;
  }

  moveCategory(id: number, categoryId: number) {
    this.products.update((products) => {
      return products.map((item) => (item.id === id ? { ...item, category: categoryId } : item));
    });
    this.saveProducts();
  }

  changeStatus(id: number, status: 'available' | 'out-of-stock' | 'archived') {
    this.products.update((products) => {
      return products.map((item) =>
        item.id === id ? (status === 'out-of-stock' ? { ...item, status: status, stock: 0 } : { ...item, status: status }) : item
      );
    });
    this.saveProducts();
  }

  getNumberOfProductsPerCategory() {
    const categoryCounts: Record<string, number> = {};
    for (const product of this.products()) {
      const category = this.categories().find((item) => item.id == product.category)?.name;
      if (category) {
        if (categoryCounts[category]) {
          categoryCounts[category]++;
        } else {
          categoryCounts[category] = 1;
        }
      }
    }
    return categoryCounts;
  }

  getLowStockProducts() {
    return this.products().filter((item) => item.stock < 5 && item.stock > 0);
  }

  getOutStockProducts() {
    return this.products().filter((item) => item.status == 'out-of-stock');
  }

  getAvgRating() {
    return this.products().reduce((sum, p) => sum + p.rating, 0) / this.products().length;
  }
}
