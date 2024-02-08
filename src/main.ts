import { Component } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { QuizComponent } from './quiz.app/quiz.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './main.html', 
  imports: [QuizComponent]
})
export class App {
  name = 'Angular';
  title: string = "";
  zrobCos(): void {
    
  }
  showArticle(id: number){
    var articles: article[] = [];
    var item = articles.find(e => e.id == id);
    if(item != null){
      this.title = item.title;
    }
  }
}
export class article {
  id: number = 0;
  title: string = '';
  text: string = '';
}

bootstrapApplication(App);
