import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../shared/services/question.service';
import { IQuestion } from '../shared/interfaces/question';
import { Question } from '../shared/clases/newQuestion';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  questions: Array<IQuestion>;
  modal = false;
  empty = false;
  answer: string;
  currentQuestion: IQuestion;
  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.getQuestion();
  }
  public modalAnswer(question: IQuestion): void {
    this.modal = true;
    this.currentQuestion = question;
  }
  public hideModal(): void {
    this.modal = false;
    this.empty = false;
    this.answer = undefined;
  }
  public sendAnswer(): void {
    if (this.answer ===  undefined ) {
      this.empty = true;
    } else {
      this.empty = false;
      this.modal = false;
      this.currentQuestion.answer = this.answer;
      this.answer = undefined;
      this.questionService.updateJsonQuestion(this.currentQuestion).subscribe();
    }
  }
  public getQuestion(): void {
    this.questionService.getQuestionJson().subscribe(
      data => {
        this.questions = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
