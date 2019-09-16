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
  optionsCollapsible: object = {
    accordion: false,
  }

  /**
   * Variable for store the product list
   *
   * @type { Array<object> }
   */
  productList: any;

  /**
   * Variable for store the categories list
   *
   * @type { Array<object> }
   */
  categoryList: any;

  /**
   * Flag for store the value of the discount
   */
  discountFlag = null;

  /**
   * Flag for store the value of the select
   */
  selectFlag = null;

  /**
   * Creates an instance of OrderComponent.
   *
   * @param { ProductService } productService service ProductService
   */
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) { }

  /**
   * Callback on init component.
   */
  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.initializeSelect();
    this.initializeCollapsible();
  }

  /**
   * Initialize the materialize collapsible
   */
  initializeCollapsible(): void {
    var elems = document.querySelectorAll('.collapsible');
    M.Collapsible.init(elems, this.optionsCollapsible);
  }

  /**
   * Initialize the materialize select
   */
  initializeSelect(): void {
    var elemsSelect = document.querySelectorAll('select');
    M.FormSelect.init(elemsSelect);
  }

  /**
   * get the product list.
   */
  getProducts(): void {
    this.productService.getProducts().subscribe(
      data => {
        this.productList = data;
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

  /**
   * get the product list.
   */
  getProductsfiltered(): void {
    this.productList = undefined
    this.productService.getProductsFiltered(this.discountFlag, this.selectFlag).subscribe(
      data => {
        this.productList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * get the product list filtered  by category
   */
  filterByCategory(category: string): void {
    this.productList = undefined
    this.productService.getProductsByCategory(category).subscribe(
      data => {
        this.productList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  onKeydown(event): void {
    this.productList = undefined;
    this.productService.getProductsByName(event.target.value).subscribe(
      data => {
        this.productList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

}
