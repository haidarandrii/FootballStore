import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/store/shared/interface/ICategory';
import { GENERAL_URL, CATEGORY_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryServiceService {
  private urlCategory: string;
  constructor(
    private http: HttpClient,
  ) {
    this.urlCategory = `${GENERAL_URL}${CATEGORY_URL}`;
  }
  public addJsonCategory(category: ICategory): Observable<Array<ICategory>> {
    return this.http.post<Array<ICategory>>(this.urlCategory, category);
  }
  public getJsonCategory(): Observable<Array<ICategory>> {
    return this.http.get<Array<ICategory>>(this.urlCategory);
  }
}
