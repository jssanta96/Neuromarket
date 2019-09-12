// Dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Services
import { PurchaseService } from '../../services/purchase.service';

/**
 * @author Diego Bello
 * @file pruchase-detail.component.ts
 * @description pruchase detail component
 */
@Component({
  selector: 'app-purchase-detail',
  templateUrl: './purchase-detail.component.html',
  styleUrls: ['./purchase-detail.component.css']
})
export class PurchaseDetailComponent implements OnInit {

  /**
   * Variable for store the bill detail
   *
   * @type { Object }
   */
  billDetail: any;

  /**
   * Variable for store the bill ID
   *
   * @type { number }
   */
  billID: number;

  /**
   * Creates an instance of ProductDetailComponent.
   *
   * @param { PurchaseService } purchaseService service PurchaseService
   */
  constructor(
    private purchaseService: PurchaseService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getBillDetail();
  }

  /**
   * get the bill detail.
   */
  getBillDetail(): void {
    this.activatedRoute.params.subscribe(params => {
      this.billID = params['id'];
    });
    this.purchaseService.getBillDetail(this.billID).subscribe(
      data => {
        this.billDetail = data;
        console.log(this.billDetail)
      },
      error => {
        console.log(error);
      }
    );
  }

}
