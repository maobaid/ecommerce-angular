import { Component, Input, signal } from '@angular/core';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
})
export class ChartComponent {
  @Input() chartType?: ChartType;
  @Input() chartData?: any;

  ngOnInit() {
    const mychart = new Chart('myChart', {
      type: this.chartType,
      data: this.chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            align: 'start',
            labels: {
              padding: 15,
              boxWidth: 14,
              boxHeight: 14,
              color: '#958d87',
              font: {
                size: 14,
                weight: 'bold',
              },
            },
          },
          tooltip: {
            enabled: true,
          },
        },
      },
    });
  }

  constructor() {}
}
