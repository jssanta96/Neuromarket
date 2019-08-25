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
  options : object =  {
    maxDate: new Date()
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

  ngOnInit() {
    this.initializeDatePicker();
    this.getProducts();
    this.getCategories();
  }

  /**
   * Initialize the materialize datePicker
   */
  initializeDatePicker(): void{
    var elems = document.querySelectorAll('.datepicker');
    M.Datepicker.init(elems, this.options);
  }

  /**
   * get the product list.
   */
  getProducts(): void{
    this.productService.getProducts().subscribe(
      data => {
        this.producList = data;
        console.log(this.producList);
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * get the category list.
   */
  getCategories(): void{
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data;
        console.log(this.categoryList);
      },
      error => {
        console.log(error);
      }
    );
  }

}
