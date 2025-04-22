import { Component, effect, EventEmitter, Input, Output, signal } from '@angular/core';
import { Product } from '../../data/products';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductService } from '../../services/product/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input() product = signal<Product | undefined>(undefined);
  @Output() formSubmit = new EventEmitter<Product>();
  productForm!: FormGroup;

  categories = this._productService.categories;

  constructor(private fb: FormBuilder, private _productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: [null, Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      status: ['available'],
      rating: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      imageUrl: ['', Validators.required],
    });

    //to detect passing product for edit
    effect(() => {
      const value = this.product();
      if (value) {
        this.productForm.patchValue(value);
        this._productService.getProductCategory(value.id);
      } else {
        this.productForm.reset();
      }
    });
  }

  submit() {
    if (this.productForm.invalid) return;

    const formValue = this.productForm.value;

    const newProduct: Product = {
      ...this.product(),
      ...formValue,
      updatedAt: new Date().toISOString(),
    };

    if (!this.product) {
      newProduct.createdAt = new Date().toISOString();
    }

    this.formSubmit.emit(newProduct);
  }
}
