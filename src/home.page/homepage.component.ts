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
  title: string = JSONdata.title
  text: string = " " + JSONdata.text
}