// Dependencies
import { Component, OnInit } from '@angular/core';
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';

// Services
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

/**
 * @author Diego Bello
 * @file product.component.ts
 * @description Product list component
 */
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})

export class ProductListComponent implements OnInit {

  /**
   * Variable for the datePicker options
   *
   * @type { object }
   */
  optionsDatePicker : object =  {
    accordion: false,
  }

  /**
   * Variable for the collapsible options
   *
   * @type { object }
   */
  optionsCollapsible : object =  {
    maxDate: new Date(),
  }

  /**
   * Variable for store the product list
   *
   * @type { Array<object> }
   */
  producList : any;

  /**
   * Variable for store the categories list
   *
   * @type { Array<object> }
   */
  categoryList : any;

  /**
   * Creates an instance of OrderComponent.
   *
   * @param { ProductService } productService service ProductService
   */
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) {}

  /**
   * Callback on init component.
   */
  ngOnInit() {
    this.initializeDatePicker();
    this.initializeCollapsible();
    this.getProducts();
    this.getCategories();
  }

  /**
   * Initialize the materialize datePicker
   */
  initializeDatePicker(): void {
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, this.optionsDatePicker);
  }

  /**
   * Initialize the materialize datePicker
   */
  initializeCollapsible(): void {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, this.optionsCollapsible);
  }

  /**
   * get the product list.
   */
  getProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.producList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * get the category list.
   */
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
