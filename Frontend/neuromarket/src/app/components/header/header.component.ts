import { Component, OnInit } from '@angular/core';
import messages from './messages'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  navLinkList: {}[];

  constructor() {
    this.navLinkList = messages.navLinks;
  }

  ngOnInit() {
  }

}
