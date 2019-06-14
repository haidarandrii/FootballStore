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

  constructor(private questionServices: QuestionService) { }

  ngOnInit() {
  }
}
