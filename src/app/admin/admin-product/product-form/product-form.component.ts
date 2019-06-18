import { Component } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { Product } from 'src/app/shared/clases/product';
import { AppState } from 'src/app/redux/app.state';
import { Store } from '@ngrx/store';
import { EditedProduct, AddProduct } from 'src/app/redux/Actions/admin.actions';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  public addProductForm = new FormGroup ({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    category: new FormControl('', [
      Validators.required
    ]),
    brands: new FormControl('', [
      Validators.required
    ]),
    image: new FormControl('', [
      Validators.required
    ]),
    price: new FormControl('', [
      Validators.required
    ]),
    descriptions: new FormControl('', [
      Validators.required,
      Validators.minLength(4)
    ])
  });
  public updateTrue = false;
  public product: IProduct = new Product();
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {
    this.store.select('adminPage').subscribe(d => {
      this.updateTrue = d.update;
      if (d.editProduct !== undefined) {
        this.product = d.editProduct;
        const { id, ...controls } = this.product;
        this.addProductForm.setValue(controls);
      }
    });
  }
  public addProduct(): void {
    const newProduct: IProduct = new Product(this.addProductForm.value);
    this.productService.addJsonProducts(newProduct).subscribe(() => {
      this.store.dispatch(new AddProduct(newProduct));
    });
    this.product = new Product();
    this.addProductForm.reset();
  }
  public saveJsonProduct(): void {
    this.productService.updateJsonProducts(this.product).subscribe();
    this.product = new Product();
    this.store.dispatch(new EditedProduct());
    this.addProductForm.reset();
  }
}
