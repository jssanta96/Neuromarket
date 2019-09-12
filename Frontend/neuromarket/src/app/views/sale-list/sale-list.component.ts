// Dependencies
import { Component, OnInit } from '@angular/core';

// Services
import { SaleService } from '../../services/sale.service';

/**
 * @author Diego Bello
 * @file sale-list.component.ts
 * @description sale-list component
 */
@Component({
  selector: 'app-sale-list',
  templateUrl: './sale-list.component.html',
  styleUrls: ['./sale-list.component.css']
})
export class SaleListComponent implements OnInit {

  /**
   * varibale for store the sales list
   */
  saleList: any;

  /**
   * Variable for store the user data
   */
  userData: any;

  /**
   * Create an instance of the saleListComponent
   * 
   * @param { saleService } saleService the sale service 
   */

  constructor( private saleService: SaleService ) { }

  ngOnInit() {
    this.getUserData();
    this.getSales();
  }

  getUserData(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  /**
   * Methos to get the sales list
   */
  getSales():void {
    this.saleService.getSales(this.userData.email).subscribe(
      data => {
        this.saleList = data;
        console.log(this.saleList)
      },
      error => {
        console.log(error);
      }
    );
  }
}
