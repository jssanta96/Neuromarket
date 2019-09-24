import { Component, OnInit } from '@angular/core';
import messages from './messages';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerTitle: String;
  footerDescription: String;
  footerLinkTitle: String;
  footerLinkList: {}[];
  copyright: String;

  constructor() {
    this.footerTitle = messages.footerTitle;
    this.footerDescription = messages.footerDescription;
    this.footerLinkTitle = messages.footerLinkTitle;
    this.footerLinkList = messages.footerLinks;
    this.copyright = messages.copyright;
  }

  ngOnInit() {
  }

}
