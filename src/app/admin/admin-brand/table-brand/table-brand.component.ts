import { Component, OnInit } from '@angular/core';
import { IBrand } from 'src/app/store/shared/interface/IBrand';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/redux/app.state';
import { ProductService } from 'src/app/shared/services/product.service';

@Component({
  selector: 'app-table-brand',
  templateUrl: './table-brand.component.html',
  styleUrls: ['./table-brand.component.scss']
})
export class TableBrandComponent implements OnInit {
  brands: Array<IBrand>;
  brand: string;
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {
    this.store.select('adminPage').subscribe(d => {
      this.brand = d.brand;
      console.log(d.brand);
      this.getBrands();
    });
  }

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
