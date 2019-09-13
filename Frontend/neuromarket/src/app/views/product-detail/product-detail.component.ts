// Dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';

// Services
import { ProductService } from '../../services/product.service';
import { checkNoChangesInRootView } from '@angular/core/src/render3/instructions';

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
   * Variable for store the product quantity
   *
   * @type { number }
   */
  productQuantity: number;

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
    this.stockArray = Array(this.productDetail.stock).fill("").map((x,i)=>i);
  }

  selectChangeHandler(event){
    this.productQuantity = event.target.value
  }

  cart(){
    var newItem = {
      id: this.productDetail.id,
      imagen: this.productDetail.ImagenProducto[0].imagen,
      name: this.productDetail.nombre,
      unitcost: this.productDetail.costo,
      discount: this.productDetail.descuento,
      cantidad: this.productQuantity
    }

    if(JSON.parse(localStorage.getItem('cart'))){
      var oldCart = JSON.parse(localStorage.getItem('cart'))
      oldCart.push(newItem)
      console.log(oldCart)
      localStorage.setItem('cart', JSON.stringify(oldCart));
    } else {
      localStorage.setItem('cart', JSON.stringify([newItem]));
    }

    //console.log(JSON.parse(localStorage.getItem('cart')))

    //console.log(localStorage.getItem('user'))
    //localStorage.setItem('cart', this.productID.toString());
    //const user = JSON.parse(localStorage.getItem('user'));


  }
}
