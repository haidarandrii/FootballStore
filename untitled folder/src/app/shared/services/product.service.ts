import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs/internal/observable';
import { IProduct } from '../interfaces/product';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { IBrand } from 'src/app/store/shared/interface/IBrand';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private urlProducts: string;
  private urlCategory: string;
  private urlBrands: string;
  private urlBasket: string;
  public countBasket: number;
  constructor(private http: HttpClient) {
    this.urlProducts = 'http://localhost:3000/products';
    this.urlCategory = 'http://localhost:3000/category';
    this.urlBrands = 'http://localhost:3000/brands';
    this.urlBasket = 'http://localhost:3000/basketProducts';
  }
  // basket
  public delBasketsProducts(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.urlBasket}/${id}`);
  }
  public getBasketProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.urlBasket);
  }
  public addBasketProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.urlBasket, product);
  }
  // get products
  public getJsonProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.urlProducts);
  }
  public getJsonCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.urlCategory);
  }
  public getJsonBrands(): Observable<Array<IBrand>> {
    return this.http.get<Array<IBrand>>(this.urlBrands);
  }
  // dell product
  public delJsonProducts(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.urlProducts}/${id}`);
  }
  // add
  public addJsonProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.urlProducts, product);
  }
  public addJsonCategory(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.urlCategory, category);
  }
  public addJsonBrand(brand: IBrand): Observable<Array<IBrand>> {
    return this.http.post<Array<IBrand>>(this.urlBrands, brand);
  }
  // edit
  public updateJsonProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.put<Array<IProduct>>(`${this.urlProducts}/${product.id}`, product);
  }
}
