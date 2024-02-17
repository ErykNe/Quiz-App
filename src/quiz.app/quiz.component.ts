import { Component, OnInit } from '@angular/core';
import Quiz_from_json from './quiz.json';
import { CommonModule } from '@angular/common';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-quizapp',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
  standalone: true,
  imports: [CommonModule]
})

export class QuizComponent implements OnInit {
  constructor() {

  }
  ngOnInit() {
    this.questions = [];

    for (let i = 0; i < Quiz_from_json.length; i++) {
      const questionData = Quiz_from_json[i];
      const question = new Question(parseInt(questionData.index_question), questionData.title, questionData.text, questionData.index_correct, questionData.index_question);
      this.questions.push(question);
    }
    return this.questions
  }
  questions: Question[] = this.ngOnInit()
  userAnswers: String [] = []
  public score: number = 0;
  public i: number = 0;
  public confirmed: boolean = false;
  public quizCompleted: boolean = false;
  assignData(answer: string){
    this.userAnswers.push(answer)
  }
  showScore(){
    let a = 0;
    this.score++;
    this.userAnswers.forEach((answer) =>{
      if(this.questions[a].answers.findIndex(elem => elem == answer) == this.questions[a].index_correct){
        this.score++;
      }
      a++;
    })
  }
  confirmAnswer(){
    if(this.i == this.questions.length - 1){
      this.quizCompleted = true;
      this.confirmed = false;
      return
    }
    this.userAnswers.forEach((answer) =>{
      if(this.questions[this.i].answers.findIndex(elem => elem == answer) == this.questions[this.i].index_correct){
        this.score++;
        
      }
    })
    this.confirmed = true;
  }
  goNext(form: HTMLElement){ 
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
      (radioButton as HTMLInputElement).checked = false;
    });
    this.i++;
    this.confirmed = false;
  }
}

export class Question {
  constructor(public numer: number, public title: string, public answers: string[], public index_correct: number, public index_question: string) {
    this.numer = numer
    this.title = title
    this.answers = answers
    this.index_correct = index_correct
    this.index_question = index_question
  }
}