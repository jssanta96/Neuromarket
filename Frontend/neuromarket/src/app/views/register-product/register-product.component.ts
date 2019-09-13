import { Component, OnInit } from '@angular/core';

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
    console.log(event.target.value)
    this.subCatList = (this.categoryList[event.target.value - 1]).subcategoria
    console.log(this.subCatList)
  }

  saveProduct() {
    console.log(this.name)
    console.log(this.description)
    console.log(this.cat)
    console.log(this.subCat)
    console.log(this.quantity)
    console.log(this.cost)
    console.log(this.condition)
    console.log(this.image)
  }

  postMethod(files: FileList) {
    this.image = files.item(0);
    /*let formData = new FormData();
    formData.append('file', this.image, this.image.name);*/
  }

}
