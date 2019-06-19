import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IProduct } from '../interfaces/product';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { IBrand } from 'src/app/store/shared/interface/IBrand';
import { GENERAL_URL, PRODUCTS_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlProducts: string;
  constructor(
    private http: HttpClient,
    ) {
    this.urlProducts = `${GENERAL_URL}${PRODUCTS_URL}`;
  }
  public getJsonProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.urlProducts);
  }
  public delJsonProducts(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.urlProducts}/${id}`);
  }
  public addJsonProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.urlProducts, product);
  }
  public updateJsonProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.urlProducts}/${product.id}`, product);
  }
}
