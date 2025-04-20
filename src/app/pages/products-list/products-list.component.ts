import { Component } from '@angular/core';
import { Product, PRODUCTS } from '../../data/products';
import { ProductCardComponent } from '../../layout/product-card/product-card.component';
import { NgClass, TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [ProductCardComponent, NgClass, TitleCasePipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent {
  products: Product[] = PRODUCTS;
  showActions = false;
  allChecked = false;

  selectProducts() {}

  addProduct() {}

  toggleActions() {
    this.showActions = !this.showActions;
  }

  deleteSelected() {}

  moveSelected() {}

  changeStatus() {}
}
