//Dependencies
import { Component, OnInit } from '@angular/core';
import * as M from 'node_modules/materialize-css/dist/js/materialize.js';
import swal from 'sweetalert2';

// Services
import { ProductService } from '../../services/product.service';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  productList;
  storeState;
  userData;
  productID;
  couponPercentage;
  discountPercentage;
  discountQuantity;

  constructor(
    private productService: ProductService,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.loadUserData();
    this.getStoreState();
    this.initModal();
  }

  getMyProducts() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.productService.getProductsByUser(user.email).subscribe(
      data => {
        this.productList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  loadUserData() {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  initModal() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  }

  deleteItem(itenID) {
    this.productService.deleteProduct(itenID).subscribe(
      data => {
        swal.fire({
          type: 'success',
          title: 'Producto eliminado',
        })
        this.getMyProducts();
      },
      error => {
        console.log(error);
      }
    );
  }

  getStoreState() {
    this.storeService.getStoreState(this.userData.email).subscribe(
      data => {
        this.storeState = data;
        this.getMyProducts();
      },
      error => {
        console.log(error);
      }
    );
  }

  newStore() {
    this.storeService.createStore(this.userData.email, this.userData.displayName).subscribe(
      data => {
        swal.fire({
          type: 'success',
          title: 'Tienda creada exitosamente',
          text: 'Empieza a comprar y vender!',
        })
        this.storeState = true
      },
      error => {
        console.log(error);
      }
    );
  }

  setID(id) {
    this.productID = id;
  }

  setCoupon() {
    this.productService.generateCoupon(this.productID, this.couponPercentage).subscribe(
      data => {
        swal.fire({
          type: 'success',
          title: 'Cupon creado exitosamente',
        })
        this.getMyProducts();
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        instances.close()
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'El cupon no ha podidos ser creado',
        })
      }
    );
  }

  setDiscount() {
    this.productService.generateDiscount(this.productID, this.discountPercentage, this.discountQuantity).subscribe(
      data => {
        swal.fire({
          type: 'success',
          title: 'Descuento creado exitosamente',
        })
        this.getMyProducts();
        var elems = document.querySelectorAll('.modal');
        var instances = M.Modal.init(elems);
        instances.close()
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'El descuento no ha podidos ser creado',
        })
      }
    );
  }

  deleteCoupon(couponID) {
    this.productService.deleteCoupon(couponID).subscribe(
      data => {
        swal.fire({
          type: 'success',
          title: 'Cupon eliminado exitosamente',
        })
        this.getMyProducts();
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'El cupon no ha podidos ser eliminado',
        })
      }
    );
  }

  deleteDiscount(discountID) {
    this.productService.deleteDiscount(discountID).subscribe(
      data => {
        swal.fire({
          type: 'success',
          title: 'Descuento eliminado exitosamente',
        })
        this.getMyProducts();
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'El descuento no ha podidos ser eliminado',
        })
      }
    );
  }

}
