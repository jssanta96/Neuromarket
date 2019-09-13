//Dependencies
import { Component, OnInit } from '@angular/core';

// Services
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  productList

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getMyProducts()
  }

  getMyProducts() {
    var user = JSON.parse(localStorage.getItem('user'));
    this.productService.getProductsByUser(user.email).subscribe(
      data => {
        this.productList = data;
        console.log(this.productList)
      },
      error => {
        console.log(error);
      }
    );
  }

}
