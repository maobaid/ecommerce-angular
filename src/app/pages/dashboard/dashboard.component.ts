import { Component } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart.component';
import { ChartType } from 'chart.js';
import { ProductService } from '../../services/product/product.service';
import { DatePipe, DecimalPipe } from '@angular/common';
import { UserService } from '../../services/user/user.service';
import { StorageService } from '../../services/storage/storage.service';
import { Product } from '../../data/products';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, DatePipe, DecimalPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  type: ChartType = 'pie';
  data = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
      },
    ],
  };

  today = new Date();

  totalProducts = this._productService.products().length;
  totalCategories = this._productService.categories().length;
  totalUsers = this._userService.users().length;

  lowStockProducts: Product[] = [];
  outStockProducts: Product[] = [];

  avgRating = this._productService.getAvgRating();

  constructor(private _productService: ProductService, private _userService: UserService) {}

  ngOnInit() {
    this._productService.loadCategories();
    this._productService.loadProducts();
    this._userService.loadUsers();
    this.data = this.getChartDataForProducts();
    this.lowStockProducts = this._productService.getLowStockProducts();
    this.outStockProducts = this._productService.getOutStockProducts();
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
  }

  getStars(rating: number) {
    const fullStars = Math.floor(rating); // Full stars (integer part)
    const halfStar = rating % 1 >= 0.5 ? 1 : 0; // Half star condition (if rating has a .5)
    const emptyStars = 5 - fullStars - halfStar; // Empty stars to make total of 5
    return {
      fullStars: Array.from({ length: fullStars }),
      halfStar,
      emptyStars: Array.from({ length: emptyStars }),
    };
  }

  getChartDataForProducts() {
    const categoryCounts = this._productService.getNumberOfProductsPerCategory();
    const labels = Object.keys(categoryCounts);
    const data = Object.values(categoryCounts);
    const backgroundColor = labels.map(() => this.getRandomColor());
    return {
      labels,
      datasets: [
        {
          label: 'Products per Category',
          data,
          backgroundColor,
        },
      ],
    };
  }
}
