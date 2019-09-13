import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartList;

  constructor() { }

  ngOnInit() {
    this.initializeCart();
  }

  initializeCart(){
    this.cartList = JSON.parse(localStorage.getItem('cart'))
  }

  removeItem(itemNumber){
    this.cartList.splice(itemNumber,itemNumber);
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }

}
