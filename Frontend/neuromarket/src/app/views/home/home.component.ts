import { Component, OnInit } from '@angular/core';
import * as M from '../../../../node_modules/materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  options = {
    fullWidth: true,
    indicators: true,
    duration: 300
  }

  constructor() { }

  ngOnInit() {
    var elems = document.querySelectorAll('.carousel');
    var instances = M.Carousel.init(elems, this.options);
  }
}
