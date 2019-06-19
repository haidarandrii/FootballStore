import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';

@Pipe({
  name: 'categoryImage'
})
export class CategoryImagePipe implements PipeTransform {
  constructor() {}
  transform(arrayProduct: Array<IProduct>, category: string): any {
    if (arrayProduct === undefined) {
      return arrayProduct;
    }
    if (category === undefined) {
      return arrayProduct;
    }
    arrayProduct = arrayProduct.filter(product => product.category === category);
    return arrayProduct;
  }
}
