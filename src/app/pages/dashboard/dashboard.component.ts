import { Component } from '@angular/core';
import { ChartComponent } from '../../components/chart/chart.component';
import { ChartType } from 'chart.js';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ChartComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  type: ChartType = 'doughnut';
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

  constructor(private _productService: ProductService) {}

  ngOnInit() {
    console.log(this._productService.getNumberOfProductsPerCategory());
    this.data.labels = Object.keys(this._productService.getNumberOfProductsPerCategory());
    this.data.datasets[0].data = Object.values(this._productService.getNumberOfProductsPerCategory());
  }
}
