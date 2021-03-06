import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { PaymentService } from '../../services/payment.service'
import swal from'sweetalert2';

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

  constructor(
    private paymentService: PaymentService,
    private router: Router
    ) { }

  ngOnInit() {
    this.initializeData()
  }

  initializeData() {
    this.itemList = JSON.parse(localStorage.getItem('cart'))
    var totalValue
    for (let count = 0; count < this.itemList.length; count++) {
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
    this.paymentMethod = 'Tarjeta'

  }

  registerSale() {
    this.paymentService.registerPayment(this.buyerEmail, this.paymentMethod, this.newItemList).subscribe(
      data => {
        localStorage.removeItem('cart');
        this.router.navigate(['/product-list']);
        swal.fire({
          type: 'success',
          title: 'Tu pago a sido registrado',
          text: 'Sigue comprando!',
        })
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error!',
        })
      }
    );
  }
}
