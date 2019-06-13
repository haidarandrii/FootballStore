import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from 'src/app/shared/services/product.service';
import { IProduct } from 'src/app/shared/interfaces/product';
import { Product } from 'src/app/shared/clases/product';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {
  products: Array<IProduct>;
  public id: number;
  public name: string;
  public category: string;
  public price: number;
  public description: string;
  public brand: string;
  public image: string;
  public updateTrue = false;
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.getProducts();
  }
  public addProduct(): void {
    const newProduct: IProduct = new Product(
      0,
      this.name,
      this.price,
      this.category,
      this.image,
      this.brand,
      this.description);
    this.name = '';
    this.brand = '';
    this.price = null;
    this.description = '';
    this.image = '';
    this.category = '';
    this.productService.addJsonProducts(newProduct).subscribe(() => {
      this.getProducts();
    });
  }
  public getProducts(): void {
    this.productService.getJsonProduct().subscribe(
      data => {
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
    this.image = product.image;
    this.name = product.name;
    this.brand = product.brands;
    this.price = product.price;
    this.category = product.category;
    this.description = product.descriptions;
    this.id = product.id;
    this.updateTrue = true;
  }
  public saveJsonProduct(): void {
    this.productService.updateJsonProducts(new Product(
      this.id,
      this.name,
      this.price,
      this.category,
      this.image,
      this.brand,
      this.description)).subscribe(() => {
        this.getProducts();
      });
    this.updateTrue = false;
    this.name = '';
    this.brand = '';
    this.price = null;
    this.description = '';
    this.image = '';
    this.category = '';
  }
}
