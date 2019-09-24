// Dependencies
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import swal from 'sweetalert2';

// Services
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  categoryList: any;
  subCatList: any;
  name;
  description;
  cat;
  subCat;
  quantity;
  cost;
  condition;
  image;
  email;
  discount;

  /**
   * Variable for store the product list
   *
   * @type { Object }
   */
  productDetail: any;

  /**
   * Variable for store the product ID
   *
   * @type { number }
   */
  productID: number;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService,
    private route: Router
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getProductDetail();
  }

  /**
   * get the product detail.
   */
  getProductDetail(): void {
    this.activatedRoute.params.subscribe(params => {
      this.productID = params['id'];
    });
    this.productService.getProductDetail(this.productID).subscribe(
      data => {
        this.productDetail = data;
        this.productID = this.productDetail.id;
        this.name = this.productDetail.nombre;
        this.description = this.productDetail.descripcion;
        this.quantity = this.productDetail.stock;
        this.cost = this.productDetail.costo;
        this.discount = this.productDetail.descuento;
        this.subCat = this.productDetail.subcategoria.id;
        this.condition = this.productDetail.condicion;
      },
      error => {
        console.log(error);
      }
    );
  }

  /**
   * get the category list.
   */
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data;
      },
      error => {
        console.log(error);
      }
    );
  }

  selectCategoryEvent(event) {
    this.subCatList = (this.categoryList[event.target.value - 1]).subcategoria
  }

  editProduct() {
    if (this.discount == null) {
      this.discount = '0'
    }

    this.productService.editProduct(this.productID, this.name, this.description, this.subCat, this.quantity, this.cost, this.discount, this.condition).subscribe(
      data => {
        this.route.navigate(['/store']);
        swal.fire({
          type: 'success',
          title: 'Producto editado exitosamente',
        })
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Se ha producido un error editando el producto'
        })
      }
    );
  }

}
