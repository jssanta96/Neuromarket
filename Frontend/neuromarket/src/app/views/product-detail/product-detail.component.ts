import { Component, OnInit } from '@angular/core';
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);

    var elemsSelect = document.querySelectorAll('select');
    M.FormSelect.init(elemsSelect);
  }
}
