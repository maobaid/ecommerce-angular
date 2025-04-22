import { Component } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart.component';
import { ChartType } from 'chart.js';
import { ProductService } from '../../services/product/product.service';
import { DatePipe } from '@angular/common';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent, DatePipe],
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

  constructor(private _productService: ProductService, private _userService: UserService) {}

  ngOnInit() {
    this.data = this.getChartDataForProducts();
  }

  getRandomColor() {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    return `rgb(${r}, ${g}, ${b})`;
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
