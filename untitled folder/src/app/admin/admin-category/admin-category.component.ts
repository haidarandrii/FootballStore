import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ProductService } from 'src/app/shared/services/product.service';
import { ICategory } from 'src/app/store/shared/interface/ICategory';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.scss']
})
export class AdminCategoryComponent implements OnInit {
  categories: Array<ICategory>;
  image: string;
  name: string;
  constructor(private productService: ProductService) { }
  ngOnInit() {
    this.getCategory();
  }
  public addCategory(): void {
    const category: ICategory = {
      name: this.name,
      img: this.image
    };
    if (category.name === undefined || category.img === undefined) { } else {
      this.productService.addJsonCategory(category).subscribe(() => {
        this.getCategory();
      });
    }
    this.name = undefined;
    this.image = undefined;
  }
  public getCategory(): void {
    this.productService.getJsonCategory().subscribe(
      data => {
        this.categories = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
