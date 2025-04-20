import { Component, Input } from '@angular/core';
import { Product } from '../../data/products';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  @Input() product?: Product;

  floor(value: number | undefined): number {
    if (value) {
      return Math.floor(value);
    }
    return 0;
  }
}
