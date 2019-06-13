import { IQuestion } from '../interfaces/question';

export class Question implements IQuestion {
    body: string;
    answer?: string;
    constructor(body, answer?) {
        this.body = body;
        this.answer = answer;
    }
}
