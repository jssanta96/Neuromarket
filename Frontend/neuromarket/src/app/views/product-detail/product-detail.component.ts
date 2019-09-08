// Dependencies
import { Component, OnInit, AfterContentChecked } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';

// Services
import { ProductService } from '../../services/product.service';

/**
 * @author Diego Bello
 * @file product-detail.component.ts
 * @description Product detail component
 */
@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})

export class ProductDetailComponent implements OnInit, AfterContentChecked {

  /**
   * Variable for store the product list
   *
   * @type { Object }
   */
  productDetail: any;

  /**
   * Variable for the stock
   *
   * @type { Array<number> }
   */
  stockArray: Array<number>;

  /**
   * Creates an instance of ProductDetailComponent.
   *
   * @param { ProductService } productService service ProductService
   */
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) { }

  /**
   * Callback on init component.
   */
  ngOnInit() {
    this.getProductDetail();
    this.initializeMaterialboxed();
  }
  
  ngAfterContentChecked(){
    this.initializeSelect();

  }

  /**
   * Initialize the materialize materialboxed
   */
  initializeMaterialboxed(): void {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
    
  }

  /**
   * Initialize the materialize select
   */
  initializeSelect(): void {
    var elemsSelect = document.querySelectorAll('select');
    M.FormSelect.init(elemsSelect);
  }

  /**
   * get the product detail.
   */
  getProductDetail(): void {
    var id: number
    this.activatedRoute.params.subscribe(params => {
      id = params['id'];
    });
    this.productService.getProductDetail(id).subscribe(
      data => {
        this.productDetail = data;
        console.log(this.productDetail)
      },
      error => {
        console.log(error);
      }
    );
  }
}