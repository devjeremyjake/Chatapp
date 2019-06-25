import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, AfterViewInit {

  toolbarElement: any;

  constructor() { }

  ngOnInit() {
    this.toolbarElement = document.querySelector('.nav-content');
  }

  ngAfterViewInit() {
    this.toolbarElement.style.display = 'none';
  }

}
