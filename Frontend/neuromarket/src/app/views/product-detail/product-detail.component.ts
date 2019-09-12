// Dependencies
import { Component, OnInit } from '@angular/core';
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

export class ProductDetailComponent implements OnInit {

  /**
   * Variable for store the product list
   *
   * @type { Object }
   */
  productDetail: any;

  /**
   * Variable for store the product ID
   *
   * @type { number }
   */
  productID: number;

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
  
  /**
   * Initialize the materialize materialboxed
   */
  initializeMaterialboxed(): void {
    var elems = document.querySelectorAll('.materialboxed');
    M.Materialbox.init(elems);
  }

  /**
   * get the product detail.
   */
  getProductDetail(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productID = params['id'];
    });
    this.productService.getProductDetail(this.productID).subscribe(
      data => {
        this.productDetail = data;
        console.log(this.productDetail)
        this.fillStockArray();
        this.initializeMaterialboxed();

      },
      error => {
        console.log(error);
      }
    );
  }

  fillStockArray(){
    this.stockArray = Array(this.productDetail.stock).fill().map((x,i)=>i);
  }

  cart(){
    var item = {
    }
    //console.log(localStorage.getItem('user'))
    localStorage.setItem('cart', this.productID.toString());

  }
}
