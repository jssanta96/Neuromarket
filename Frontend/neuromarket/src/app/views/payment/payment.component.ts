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
  newItemList = [];

  constructor(private paymentService: PaymentService) { }

  ngOnInit() {
    this.initializeData()
  }

  initializeData() {
    this.itemList = JSON.parse(localStorage.getItem('cart'))
    console.log(this.itemList[0])
    var totalValue
    for (let count = 0; count < this.itemList.length; count++) {
      console.log("for " + this.itemList[count].name);
      if(this.itemList[count].discount === 0){
        totalValue = this.itemList[count].unitcost
      }
      else{
        totalValue = (this.itemList[count].unitcost - ((this.itemList[count].discount/100) * this.itemList[count].unitcost))
      }
      var item = {
        id: this.itemList[count].id,
        precio: totalValue,
        cantidad: this.itemList[count].cantidad
      }
      this.newItemList.push(item)
    }
    this.buyerEmail = (JSON.parse(localStorage.getItem('user'))).email
    this.paymentMethod = 'Test'
    console.log('itemList ' + this.newItemList)
    console.log('buyerEmail ' + this.buyerEmail)
    console.log('paymentMethod ' + this.paymentMethod)
  }

  registerSale() {
    this.paymentService.registerPayment(this.buyerEmail, this.paymentMethod, this.newItemList).subscribe(
      data => {
        console.log(data)
        localStorage.removeItem('cart');
      },
      error => {
        console.log(error);
      }
    );
  }
}
