import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../interfaces/user';
import { Observable } from 'rxjs';
import { GENERAL_URL, USERS_URL } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url: string;
  constructor(
    private http: HttpClient,
    ) {
    this.url = `${GENERAL_URL}${USERS_URL}`;
  }
  public addUser(user: IUser): Observable<Array<IUser>> {
    return this.http.post<Array<IUser>>(this.url, user);
  }
  public getUser(): Observable<Array<IUser>> {
    return this.http.get<Array<IUser>>(this.url);
  }
}
