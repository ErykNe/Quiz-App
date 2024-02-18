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
  ngOnInit() {
    this.quizes = [];
    Quiz_from_json.forEach(quizData => {
      const questions: Question[] = [];
      quizData.questions.forEach(questionData => {
        const question = new Question(
          parseInt(questionData.index_question),
          questionData.title,
          questionData.text,
          questionData.index_correct,
          questionData.index_question
        );
        questions.push(question);
      });
      const quiz = new Quiz(quizData.quizName, questions);
      this.quizes.push(quiz);
    });
    return this.quizes
  }
  
  quizes: Quiz[] = this.ngOnInit();
  questions: Question[] = []
  userAnswers: String [] = []

  public score: number = 0;
  public i: number = 0;
  public confirmed: boolean = false;
  public quizStarted: boolean = false;
  public quizCompleted: boolean = false;

  chooseQuiz(quiz: Quiz){
    this.questions = quiz.questions;
    console.log(this.questions)
    this.quizStarted = true;
  }
  assignData(answer: string){
    this.userAnswers[this.i] = answer
  }
  confirmAnswer(form: HTMLElement){
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    let anyChecked = false;
    radioButtons.forEach(radioButton => {
      if((radioButton as HTMLInputElement).checked == true){
        anyChecked = true;
      }
    });
    if(!anyChecked){
      alert("Please select correct answer for a question.");
      return
    }
    if(this.questions[this.i].answers.findIndex(elem => elem == this.userAnswers[this.i]) == this.questions[this.i].index_correct){
      this.score++;
    }
    this.confirmed = true;
    if(this.i == this.questions.length - 1){
      this.quizCompleted = true;
      this.confirmed = false;
      return
    }
  }
  goNext(form: HTMLElement){ 
    const radioButtons = form.querySelectorAll('input[type="radio"]');
    radioButtons.forEach(radioButton => {
      (radioButton as HTMLInputElement).checked = false;
    });
    this.i++;
    this.confirmed = false;
  }
  isAnswerCorrect(): boolean {
    return this.questions[this.i].answers.findIndex(elem => elem == this.userAnswers[this.i]) == this.questions[this.i].index_correct;
  }
  getClassForAnswer(answer: string, i: number, confirmed: boolean): string {
    const isCorrect = this.questions[i].answers.indexOf(answer) === this.questions[i].index_correct;
    const isAnsweredCorrectly = this.questions[i].answers.findIndex(elem => elem == this.userAnswers[i]) == this.questions[i].index_correct;
    
    if (isCorrect && confirmed) {
      return 'alert alert-success';
    } else if (!isAnsweredCorrectly && confirmed) {
      return 'alert alert-danger';
    } else {
      return '';
    }
  }
}
export class Quiz{
  constructor(public quizName: string, public questions: Question[]){
    this.quizName = quizName;
    this.questions = questions;
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