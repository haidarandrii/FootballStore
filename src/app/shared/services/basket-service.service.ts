import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../interfaces/product';
import { GENERAL_URL, BASKET_PRODUCT_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BasketServiceService {
  private urlBasket: string;
  constructor(
    private http: HttpClient,
  ) {
    this.urlBasket = `${GENERAL_URL}${BASKET_PRODUCT_URL}`;
  }
  public delBasketsProducts(id: number): Observable<Array<IProduct>> {
    return this.http.delete<Array<IProduct>>(`${this.urlBasket}/${id}`);
  }
  public getBasketProduct(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>(this.urlBasket);
  }
  public addBasketProducts(product: IProduct): Observable<Array<IProduct>> {
    return this.http.post<Array<IProduct>>(this.urlBasket, product);
  }
}
