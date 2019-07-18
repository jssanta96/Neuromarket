import { Component, AfterViewInit } from '@angular/core';
import messages from './messages';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {

  slidesList: {}[];
  productsList: {}[];
  cardList: {}[];

  options = {
    indicators: false,
    interval: 4000
  }

  constructor() {
    this.slidesList = messages.slides;
    this.cardList = messages.cards;
    this.productsList = [
      {
        imagen: 'https://www.abcdin.cl/wcsstore/ABCDIN/images/televisores-led/1122691F13.jpg',
        title: 'Televisor Led 48"',
        link: '$1.258.245',
        desc:'Televisor full Hd con pantalla plana'
      },
      {
        imagen: 'https://www.abcdin.cl/wcsstore/ABCDIN/images/televisores-led/1122691F13.jpg',
        title: 'test 2',
        link: 'test 2',
        desc:'test 2'
      },
      {
        imagen: 'https://www.abcdin.cl/wcsstore/ABCDIN/images/televisores-led/1122691F13.jpg',
        title: 'test 3',
        link: 'test 3',
        desc:'test 3'
      },
      {
        imagen: 'https://www.abcdin.cl/wcsstore/ABCDIN/images/televisores-led/1122691F13.jpg',
        title: 'test 3',
        link: 'test 3',
        desc:'test 3'
      }
    ]
  }

  ngAfterViewInit() {
    var elems = document.querySelectorAll('.slider');
    var instances = M.Slider.init(elems, this.options);
  }
}
