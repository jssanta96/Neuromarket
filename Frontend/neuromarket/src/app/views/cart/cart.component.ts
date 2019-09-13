import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList = [];

  constructor(
    public router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.initializeCart();
  }

  initializeCart() {
    this.cartList = JSON.parse(localStorage.getItem('cart'))
  }

  removeItem(itemNumber) {
    console.log(this.cartList.length)
    if (this.cartList.length === 1) {
      localStorage.removeItem('cart');
      this.cartList = [];
    }
    else {
      this.cartList.splice(itemNumber, 1);
      localStorage.setItem('cart', JSON.stringify(this.cartList));
    }
  }

  validateLogin() {
    console.log(this.cartList.length)

    if (this.authService.isLoggedIn() && this.cartList.length !== 0) {
      this.router.navigate(['/payment']);
    }
    else if (this.authService.isLoggedIn() && this.cartList.length === 0){
      this.router.navigate(['/product-list']);
    }
    else if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

}
