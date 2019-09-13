import { Component, AfterViewInit } from '@angular/core';
import messages from './messages';
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  slidesList: Array<{}>;
  productsList: Array<{}>;
  cardList: Array<{}>;

  options: object = {
    indicators: false,
    interval: 4000
  }

  constructor() {
    this.slidesList = messages.slides;
    this.cardList = messages.cards;
    this.productsList = messages.productsList
  }

  ngAfterViewInit() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, this.options);
  }
}
