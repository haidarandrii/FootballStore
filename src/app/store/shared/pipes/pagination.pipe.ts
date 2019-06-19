import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ViewService } from '../../services/view.service';
import { PRODUCTS_ON_ONE_PAGE } from '../const';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
  constructor(private viewService?: ViewService) {}

  transform(arrayProduct: Array<IProduct>, pages: number): Array<IProduct> {
    const productsOnPage: Array<IProduct> = [];
    this.viewService.arrayProductLength = arrayProduct.length;
    const maxLength = (pages - 1) * PRODUCTS_ON_ONE_PAGE + PRODUCTS_ON_ONE_PAGE;
    for (let i = (pages - 1) * PRODUCTS_ON_ONE_PAGE;
      i < maxLength; i++) {
      if (i === arrayProduct.length) {
        return productsOnPage;
      }
      productsOnPage.push(arrayProduct[i]);
    }
    return productsOnPage;
  }
}
