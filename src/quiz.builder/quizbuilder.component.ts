import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import quizJSON from '../quiz.app/quiz.json';

@Component({
  selector: 'app-quizbuilder',
  standalone: true,
  templateUrl: './quizbuilder.component.html',
  styleUrls: ['./quizbuilder.component.css'],
  imports: [CommonModule, FormsModule], 
})
export class QuizbuilderComponent implements OnInit {
  quizName: string = "";
  ngOnInit(){
    this.questions = [];
    this.questions.push(new Question("1","", [""], -1));
    return this.questions;
  }
  questions: Question[] = this.ngOnInit();

  addQuestion() {
    this.questions.push(new Question((this.questions.length + 1).toString(),"", [""], -1));
  }

  removeQuestion(index: number) {
    this.questions.splice(index, 1);
  }

  addAnswer(questionIndex: number) {
    this.questions[questionIndex].text.push("");
  }
  updateAnswer(value: string, questionIndex: number, answerIndex: number) {
    this.questions[questionIndex].text[answerIndex] = value;
  }
  removeAnswer(questionIndex: number, answerIndex: number) {
    this.questions[questionIndex].text.splice(answerIndex, 1);
  }
  assignDataToJSON() {
    if (!this.allInputsFilled()) {
      alert("Please fill in all fields and select correct answers for each question.");
      return;
    }
    let newQuestionData = this.questions.map(question => {
      return {
        index_question: question.index_question, 
        title: question.title,
        text: question.text,
        index_correct: question.index_correct 
      };
    });
    let newQuiz = {
      quizName: this.quizName,
      questions: newQuestionData
    };
    quizJSON.push(newQuiz);

    this.questions = this.ngOnInit();
    this.quizName = "";
    alert("Quiz has been saved!")
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  allInputsFilled(): boolean {
    for (let question of this.questions) {
      if (!question.title || question.text.length === 0 || question.index_correct == -1) {
        return false;
      }
      for (let answer of question.text) {
        if (!answer) {
          return false;
        }
      }
    }
    return true;
  }
}
export class Quiz{
  constructor(public quizName: string, public questions: Question[]){
    this.quizName = quizName;
    this.questions = questions;
  }
}
export class Question {
  constructor(public index_question: string, public title: string, public text: string[], public index_correct: number) {}
}
