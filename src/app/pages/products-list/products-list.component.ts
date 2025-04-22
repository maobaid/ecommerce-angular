import { Component, computed, signal } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';
import { NgClass, TitleCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';
import { ProductFormComponent } from '../../components/product-form/product-form.component';
import { ToastService } from '../../services/toast/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [NgClass, TitleCasePipe, FormsModule, ProductFormComponent],
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

  searchText = signal('');
  selectedCategoryId = signal<number | null>(null);

  constructor(private _productSetvice: ProductService, private _toast: ToastService) {}

  filteredProducts = computed(() => {
    const query = this.searchText().toLowerCase().trim();
    const categoryId = this.selectedCategoryId();

    return this.products().filter((product) => {
      const matchesSearch = !query || product.name.toLowerCase().includes(query);
      const matchesCategory = !categoryId || product.category === categoryId;
      return matchesSearch && matchesCategory;
    });
  });

  ngOnInit(): void {
    this._productSetvice.loadProducts();
    this._productSetvice.loadCategories();
  }

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
      this._toast.success('Product Updated');
    } else {
      // Add new
      this._productSetvice.addProduct(product);
      this._toast.success('Product Added');
    }
    this.closeModal();
  }

  bulkDelete() {
    Swal.fire({
      title: 'Are you sure?',
      text: `You won't be able to revert this!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: `Deleted!`,
          text: `Products are deleted!`,
          icon: 'success',
        });
        this.selectedProducts.forEach((element) => {
          this._productSetvice.removeProduct(element);
        });
      }
      this.selectedProducts = [];
      this.allChecked = false;
      this.showActions = false;
    });
  }

  bulkMove(id: number) {
    this.selectedProducts.forEach((element) => {
      this._productSetvice.moveCategory(element, id);
    });
    this._toast.success(`Products Moved to ${this.categories().find((item) => item.id == id)?.name}`);
    this.selectedProducts = [];
    this.allChecked = false;
    this.showActions = false;
  }

  bulkChangeStatus(status: 'available' | 'out-of-stock' | 'archived') {
    this.selectedProducts.forEach((element) => {
      this._productSetvice.changeStatus(element, status);
    });
    this._toast.success(`Products Status Changed to ${status}`);
    this.selectedProducts = [];
    this.allChecked = false;
    this.showActions = false;
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
  }

  toggleSelectAll(isChecked: boolean) {
    if (isChecked) {
      this.selectedProducts = this.products().map((p) => p.id);
    } else {
      this.selectedProducts = [];
    }
  }

  isAllSelected(): boolean {
    return this.products().length > 0 && this.selectedProducts.length === this.products().length;
  }
}
