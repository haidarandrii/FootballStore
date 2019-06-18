import { Component, OnInit } from '@angular/core';
import { StartEditProduct } from 'src/app/redux/Actions/admin.actions';
import { Store } from '@ngrx/store';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { AppState } from 'src/app/redux/app.state';

@Component({
  selector: 'app-table-products',
  templateUrl: './table-products.component.html',
  styleUrls: ['./table-products.component.scss']
})
export class TableProductsComponent implements OnInit {
  products: IProduct[];
  product: IProduct;
  constructor(
    private productService: ProductService,
    private store: Store<AppState>
  ) {
    this.store.select('adminPage').subscribe(d => {
      this.product = d.addProduct;
      this.getProducts();
    });
  }

  ngOnInit() {
    this.getProducts();
  }
  public getProducts(): void {
    this.productService.getJsonProduct().subscribe(
      data => {
        console.log(data);
        this.products = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  public isDeleteProduct(product: IProduct): void {
    const id = product.id;
    this.productService.delJsonProducts(id).subscribe(() => {
      this.getProducts();
    });
  }
  public showEdit(product: IProduct): void {
    this.store.dispatch(new StartEditProduct(product));
  }
}
