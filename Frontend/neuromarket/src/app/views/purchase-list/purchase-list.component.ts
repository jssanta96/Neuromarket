// Dependencies
import { Component, OnInit } from '@angular/core';

// Services
import { PurchaseService } from '../../services/purchase.service';

/**
 * @author Diego Bello
 * @file purchase.component.ts
 * @description Purchase detail component
 */
@Component({
  selector: 'app-purchase-list',
  templateUrl: './purchase-list.component.html',
  styleUrls: ['./purchase-list.component.css']
})
export class PurchaseListComponent implements OnInit {

  /**
   * Variable for store the user data
   *
   * @type { string }
   */
  userData: any;

  /**
   * Variable for store the user data
   *
   * @type { string }
   */
  billList: any;

  constructor(
    private purchaseService: PurchaseService
  ) {
    this.userData = JSON.parse(localStorage.getItem('user'));
  }

  ngOnInit() {
    this.getBillList();
  }

  getBillList() {
    this.purchaseService.getBills(this.userData.email).subscribe(
      data => {
        this.billList = data;
        console.log(this.billList)
      },
      error => {
        console.log(error);
      }
    );
  }

}
