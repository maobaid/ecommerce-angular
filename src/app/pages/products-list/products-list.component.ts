import { Component, signal } from '@angular/core';
import { Product } from '../../data/products';
import { ProductCardComponent } from '../../layout/product-card/product-card.component';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, NgClass, TitleCasePipe, FormsModule, ProductFormComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products = this._productSetvice.products;
  categories = this._productSetvice.categories;
  showActions = false;
  allChecked = false;
  selectedProducts: number[] = [];

  modalOpen = false;
  selectedProduct = signal<Product | undefined>(undefined);

  constructor(private _productSetvice: ProductService) {}

  getProductCategory(id: number) {
    return this._productSetvice.getProductCategory(id);
  }

  openAddModal() {
    this.selectedProduct.set(undefined);
    this.modalOpen = true;
  }

  openEditModal(product: Product) {
    this.selectedProduct.set(product);
    this.modalOpen = true;
  }

  closeModal() {
    this.modalOpen = false;
  }

  handleFormSubmit(product: Product) {
    if (product.id) {
      // Update existing
      this._productSetvice.editProduct(product);
    } else {
      // Add new
      this._productSetvice.addProduct(product);
    }
    this.closeModal();
  }

  bulkDelete() {
    this.selectedProducts.forEach((element) => {
      this._productSetvice.removeProduct(element);
    });
    this.selectedProducts = [];
    this.allChecked = false;
    this.closeModal();
  }

  bulkMove(id: number) {
    this.selectedProducts.forEach((element) => {
      this._productSetvice.moveCategory(element, id);
    });
    this.selectedProducts = [];
    this.allChecked = false;
    this.closeModal();
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
      this.selectedProducts = this.products().map((p) => p.id);
    } else {
      this.selectedProducts = [];
    }
    console.log(this.selectedProducts);
  }

  isAllSelected(): boolean {
    return this.products.length > 0 && this.selectedProducts.length === this.products.length;
  }
}
