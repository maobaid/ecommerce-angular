import { Component } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';
import { ProductCardComponent } from '../../layout/product-card/product-card.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, NgClass, TitleCasePipe, FormsModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products: Product[] = PRODUCTS;
  showActions = false;
  allChecked = false;
  selectedProducts: number[] = [];

  addProduct() {}

  editProduct(id: number) {}

  bulkDelete() {
    console.log('Deleting products:', this.selectedProducts);
    // Example: remove selected products from list //TODO: move to service
    this.products = this.products.filter((p) => !this.selectedProducts.includes(p.id));
    this.selectedProducts = [];
  }

  bulkMove() {
    console.log('Moving products to another category:', this.selectedProducts);
    // Implement your move logic here //TODO: call from service
  }

  bulkChangeStatus(status: string) {
    //TODO: call from service
  }

  toggleActions() {
    this.showActions = !this.showActions;
  }

  toggleSelection(productId: number, isChecked: boolean) {
    if (isChecked) {
      this.selectedProducts.push(productId);
    } else {
      this.selectedProducts = this.selectedProducts.filter((id) => id !== productId);
    }
    console.log(this.selectedProducts);
  }

  toggleSelectAll(isChecked: boolean) {
    if (isChecked) {
      this.selectedProducts = this.products.map((p) => p.id);
    } else {
      this.selectedProducts = [];
    }
    console.log(this.selectedProducts);
  }

  isAllSelected(): boolean {
    return this.products.length > 0 && this.selectedProducts.length === this.products.length;
  }
}
