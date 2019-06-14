import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/shared/interfaces/product';
import { ICategory } from '../interface/ICategory';

@Pipe({
  name: 'checkboxCat'
})
export class CheckboxCatPipe implements PipeTransform {
  public filteredCategory(product: IProduct, category) {
    return product.category === category;
  }
  transform(arrayProduct: Array<IProduct>, categories: Array<ICategory>, brands: Array<string>): any {
    if (categories.length === 0 && brands.length === 0) {
      return arrayProduct;
    }
    let arrayFilteredProduct = [];
    arrayFilteredProduct = arrayProduct.filter(product =>
      (categories.length === 0 || categories.some(category => category.name === product.category))
      && (brands.length === 0 || brands.some(brand => brand === product.brands)));
    return arrayFilteredProduct;
  }
}

