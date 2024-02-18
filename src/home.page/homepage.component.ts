import { Component, OnInit } from '@angular/core';
import JSONdata from './data.json';

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  article: Article = new Article(JSONdata.title, JSONdata.text)
}
export class Article {
  constructor(public title: string, public text: string){
    this.title = title;
    this.text = text;
  }
}