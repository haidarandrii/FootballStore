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
  constructor(private productService: ProductService) { }
  ngOnInit() {
  }
}
