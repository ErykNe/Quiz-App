import { Component, OnInit } from '@angular/core';
import Quiz_from_json from './quiz.json';
import { CommonModule } from '@angular/common';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'quiz-component',
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
      const question = new Question(questionData.index_question, questionData.title, questionData.text, questionData.index_correct);
      this.questions.push(question);
    }
    return this.questions
  }
  questions: Question[] = this.ngOnInit()
  userAnswers: String [] = []
  public score: number = -1;
  assignData(answer: string){
    this.userAnswers.push(answer)
  }
  showScore(){
    let a = 0;
    this.userAnswers.forEach((answer) =>{
      if(this.questions[a].answers.findIndex(elem => elem == answer) == this.questions[a].index_correct){
        this.score++;
      }
      a++;
    })
  }
}

export class Question {
  constructor(public numer: number, public title: string, public answers: string[], public index_correct: number) {
    this.numer = numer
    this.title = title
    this.answers = answers
    this.index_correct = index_correct
  }
}