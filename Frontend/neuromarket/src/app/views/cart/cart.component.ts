import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService } from '../../services/auth.service'
import { StoreService } from '../../services/store.service'
import { NgControlStatus } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList = [];
  storeState;

  constructor(
    public router: Router,
    private authService: AuthService,
    private storeService: StoreService
  ) { }

  ngOnInit() {
    this.initializeCart();
    this.getStoreState();
  }

  initializeCart() {
    this.cartList = JSON.parse(localStorage.getItem('cart'))
  }

  getStoreState() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.storeService.getStoreState(user.email).subscribe(
      data => {
        console.log(data)
        this.storeState = data;
      },
      error => {
        console.log(error);
      }
    );
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
    if (this.cartList == null || (this.authService.isLoggedIn() && this.cartList.length === 0)){
      this.router.navigate(['/product-list']);
    }
    else if (this.authService.isLoggedIn() && this.cartList.length !== 0 && this.storeState) {
      this.router.navigate(['/payment']);
    }
    else if(this.authService.isLoggedIn() && !this.storeState){
      this.router.navigate(['/store']);
    }
    else if(!this.authService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
  }

}
