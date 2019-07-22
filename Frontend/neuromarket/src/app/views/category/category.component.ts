import { Component, OnInit, AfterViewInit } from '@angular/core';
import messages from './messages';
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})

export class CategoryComponent implements OnInit, AfterViewInit {

  title: String;
  categoriesList: {}[]
  options = {
    accordion: true
  }

  constructor() { 
    this.title = messages.title;
    this.categoriesList = messages.categories;
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, this.options);
  }

}
