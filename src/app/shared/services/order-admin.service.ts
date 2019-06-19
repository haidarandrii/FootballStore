import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IOrder } from '../interfaces/order';
import { GENERAL_URL, ADMIN_ORDER_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class OrderAdminService {
urlOrder: string;
  constructor(
    private http: HttpClient,
    ) {
    this.urlOrder = `${GENERAL_URL}${ADMIN_ORDER_URL}`;
  }
  public getJsonOrderProduct(): Observable<Array<IOrder>> {
    return this.http.get<Array<IOrder>>(this.urlOrder);
}
  public addJsonOrderProduct(product): Observable<Array<IOrder>> {
    return this.http.post<Array<IOrder>>(this.urlOrder, product);
  }
  public delJsonProducts(id: number): Observable<Array<IOrder>> {
    return this.http.delete<Array<IOrder>>(`${this.urlOrder}/${id}`);
  }
  public updateJsonOrder(order: IOrder): Observable<Array<IOrder>> {
    return this.http.put<Array<IOrder>>(`${this.urlOrder}/${order.id}`, order);
  }
}
