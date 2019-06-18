import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { IBrand } from 'src/app/store/shared/interface/IBrand';

@Component({
  selector: 'app-admin-brand',
  templateUrl: './admin-brand.component.html',
  styleUrls: ['./admin-brand.component.scss']
})
export class AdminBrandComponent implements OnInit {
  products: Array<IProduct>;
  brands: Array<IBrand>;
  brand: string;
  categories: Array<ICategory>;
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.getBrands();
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
