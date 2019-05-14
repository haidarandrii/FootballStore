import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ViewService } from '../../services/view.service';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
  constructor (private viewService: ViewService) {}

  transform(arrayProduct: Array<IProduct>, pages: number): Array<IProduct> {
    let productsOnPage: Array<IProduct> = [];
    this.viewService.arrayProductLength = arrayProduct.length;
    for (let i = (pages - 1) * 10; i < (pages - 1) * 10 + 10; i++) {
      if (i === arrayProduct.length) {
        return productsOnPage;
      }
        productsOnPage.push(arrayProduct[i]);        
      }
    return productsOnPage;
}
}
