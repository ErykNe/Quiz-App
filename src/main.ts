import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { HomepageComponent } from './home.page/homepage.component';
import { QuizComponent } from './quiz.app/quiz.component';
import { QuizbuilderComponent } from './quiz.builder/quizbuilder.component';
import { RegistrationappComponent } from './registration.app/registrationapp.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './main.html', 
  imports: [HomepageComponent, QuizComponent, QuizbuilderComponent, RegistrationappComponent, CommonModule]
})
export class App {
  name = 'Angular'
  title: string = ""
  public HomeVisible: boolean = true
  public QuizBuilderVisible: boolean = false
  public QuizAppVisible: boolean = false
  public RegistrationAppVisible: boolean = false

  showHome() {
    this.toggleVisibility(true, false, false, false)
  }

  showQuizBuilder() {
    this.toggleVisibility(false, true, false, false)
  }

  showQuizApp() {
    this.toggleVisibility(false, false, true, false)
  }

  showRegistrationApp() {
    this.toggleVisibility(false, false, false, true)
  }

  private toggleVisibility(home: boolean, quizBuilder: boolean, quizApp: boolean, registrationApp: boolean) {
    this.HomeVisible = home
    this.QuizBuilderVisible = quizBuilder
    this.QuizAppVisible = quizApp
    this.RegistrationAppVisible = registrationApp
    console.log("worked!")
  }
}

bootstrapApplication(App);
