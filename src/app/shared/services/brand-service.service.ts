import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBrand } from 'src/app/store/shared/interface/IBrand';
import { Observable } from 'rxjs';
import { GENERAL_URL, BRANDS_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class BrandServiceService {
  private urlBrands: string;
  constructor(
    private http: HttpClient,
  ) {
    this.urlBrands = `${GENERAL_URL}${BRANDS_URL}`;
  }
  public getJsonBrands(): Observable<Array<IBrand>> {
    return this.http.get<Array<IBrand>>(this.urlBrands);
  }
  public addJsonBrand(brand: IBrand): Observable<Array<IBrand>> {
    return this.http.post<Array<IBrand>>(this.urlBrands, brand);
  }
}
