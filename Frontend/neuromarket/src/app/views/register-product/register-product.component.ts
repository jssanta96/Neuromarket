// Dependencies
import { Component, OnInit } from '@angular/core';
import swal from'sweetalert2';

// Services
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-register-product',
  templateUrl: './register-product.component.html',
  styleUrls: ['./register-product.component.css']
})
export class RegisterProductComponent implements OnInit {

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
  errorAlert: string = '';

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  /**
   * get the category list.
   */
  getCategories(): void {
    this.categoryService.getCategories().subscribe(
      data => {
        this.categoryList = data;
        console.log(this.categoryList)
      },
      error => {
        console.log(error);
      }
    );
  }

  selectCategoryEvent(event) {
    this.subCatList = (this.categoryList[event.target.value - 1]).subcategoria
  }

  saveProduct() {
    this.email = (JSON.parse(localStorage.getItem('user'))).email

    if(this.discount == null){
      this.discount = '0'
    }

    let formData = new FormData();
    formData.append('correo', this.email)
    formData.append('nombre', this.name)
    formData.append('descripcion', this.description)
    formData.append('file', this.image)
    formData.append('stock', this.quantity)
    formData.append('condicion', this.condition)
    formData.append('costo', this.cost)
    formData.append('subcategoria', this.subCat)
    formData.append('descuento', this.discount)

    this.productService.registerProduct(formData).subscribe(
      data => {
        console.log(data)
      },
      error => {
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Por favor completa el formulario!'
        })
      }
    );
  }

  postMethod(files: FileList) {
    this.image = files.item(0);
  }

}
