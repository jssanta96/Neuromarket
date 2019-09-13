import { Component, OnInit } from '@angular/core';

import { PaymentService } from '../../services/payment.service'

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  itemList;
  buyerEmail;
  paymentMethod;

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.initializeData()
  }

  initializeData() {
    this.itemList = JSON.parse(localStorage.getItem('cart'))
    this.buyerEmail = (JSON.parse(localStorage.getItem('cart'))).email
    this.paymentMethod = 'Test'
    console.log('itemList ' + this.itemList )
    console.log('buyerEmail ' + this.buyerEmail )
    console.log('paymentMethod ' + this.paymentMethod )

  }

  registerSale() {
    this.paymentService.registerPayment(this.buyerEmail, this.paymentMethod, this.itemList).subscribe(
      data => {
        console.log(data)
      },
      error => {
        console.log(error);
      }
    );
  }
}
