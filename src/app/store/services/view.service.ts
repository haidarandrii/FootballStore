import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from 'src/app/shared/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ViewService {
  private urlView: string;
  public arrayProductLength: number;
  constructor(private http: HttpClient) {
    this.urlView = `http://localhost:3000/products`;
    this.arrayProductLength = 0;
   }
  public getJsonProduct(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.urlView}/${id}`);
  }
}
