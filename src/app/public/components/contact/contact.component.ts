import { Component, OnInit } from '@angular/core';
import { QuestionService } from 'src/app/admin/shared/services/question.service';
import { IQuestion } from 'src/app/admin/shared/interfaces/question';
import { Question } from 'src/app/admin/shared/clases/newQuestion';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  question: string;
  arrayQuestions: Array<IQuestion>;
  modalTrue = false;
  constructor(private questionServices: QuestionService) { }

  ngOnInit() {
    this.getQuestions();
  }
  public showAnswer(): void {
    this.modalTrue = true;
  }
  public hideModal(): void {
    this.modalTrue = false;
  }
  public addQuestion(): void {
    if (this.question === undefined) {

    } else {
    this.questionServices.addQuestionJson(new Question(this.question)).subscribe();
    this.question = null;
    }
  }
  public getQuestions(): void {
    this.questionServices.getQuestionJson().subscribe(
      data => {
        this.arrayQuestions = data;
      },
      err => {
        console.log(err);
      }
    );
  }
}
