import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IQuestion } from '../interfaces/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  url: string;
  constructor(private http: HttpClient) {
    this.url = 'http://localhost:3000/question';
  }
  public getQuestionJson(): Observable<Array<IQuestion>> {
    return this.http.get<Array<IQuestion>>(this.url);
  }
  public addQuestionJson(quest): Observable<Array<IQuestion>> {
    return this.http.post<Array<IQuestion>>(this.url, quest);
  }
  public updateJsonQuestion(question: IQuestion): Observable<Array<IQuestion>> {
    console.log(question);
    return this.http.put<Array<IQuestion>>(`${this.url}/${question.id}`, question);
  }
}
