import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ProductService } from 'src/app/shared/services/product.service';
import { IBrand } from 'src/app/store/shared/interface/IBrand';
import { AddBrand } from 'src/app/redux/Actions/admin.actions';
import { AppState } from 'src/app/redux/app.state';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-brand',
  templateUrl: './form-add-brand.component.html',
  styleUrls: ['./form-add-brand.component.scss']
})
export class FormAddBrandComponent implements OnInit {
  brand = new FormControl('', [
    Validators.required,
    Validators.minLength(2)
  ]);
  brands: Array<IBrand>;
  // brand: string;
  constructor(
    private store: Store<AppState>,
    private productService: ProductService
  ) { }

  ngOnInit() {
  }
  public addBrand(): void {
      console.log(this.brand);
      const newBrand: IBrand = {
        name: this.brand.value,
      };
      this.productService.addJsonBrand(newBrand).subscribe(() => {
        this.getBrands();
        this.store.dispatch(new AddBrand(this.brand.value));
      });
      this.brand.reset();
  }
  public getBrands(): void {
    this.productService.getJsonBrands().subscribe(
      data => {
        this.brands = data;
      },
      err => {
        console.log(err);
      }
    );
  }

}
