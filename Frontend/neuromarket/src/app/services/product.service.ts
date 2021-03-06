// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @author Diego Bello
 * @file product.service.ts
 * @description Product service
 */
@Injectable({ providedIn: 'root' })
export class ProductService {

  /**
   * Variable for the API root url
   *
   * @type { string }
   */
  apiURL: string = 'http://127.0.0.1:8000'

  /**
   * Creates an instance of ProductService.
   *
   * @param { HttpClient } httpClient The HttpClient to make request calls.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Gets the product list
   *
   * @returns { Observable<any> } an observable with the produc list.
   */
  public getProducts(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/productos`);
  }

  /**
   * Gets the specific product
   *
   * @returns { Observable<any> } an observable with the specific product
   */
  public getProductDetail(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/productos/${id}`);
  }

  /**
   * Gets the product list filtered
   * 
   * @param { boolean } discount The state of the discount
   * @param { boolean } state the state of the product
   *
   * @returns { Observable<any> } an observable with the produc list filtered.
   */
  public getProductsFiltered(discount: boolean, state: boolean): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/productos/filtrar`, {
      descuento: discount,
      estado: state,
    });
  }

  /**
   * Gets the product list by category
   *
   * @returns { Observable<any> } an observable with the produc list by category.
   */
  public getProductsByCategory(category: string): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/categorias/filtrar`, {
      campo: category
    });
  }

  /**
   * Gets the product list by name
   *
   * @returns { Observable<any> } an observable with the produc list by name.
   */
  public getProductsByName(name: string): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/productos/busqueda`, {
      campo: name
    });
  }

  /**
   * Gets the products registered by an user
   *
   * @returns { Observable<any> } an observable with the list of products
   */
  public getProductsByUser(email: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/productos/misproductos/${email}`);
  }

  /**
   * generate a coupon for a product
   *
   * @returns { Observable<any> } an observable with the response
   */
  public generateCoupon(product: number, discount: number): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/productos/cupones`, {
      idproducto: product,
      cantidad: 1,
      descuento: discount
    });
  }

  /**
   * generate a discount for a product
   *
   * @returns { Observable<any> } an observable with the response
   */
  public generateDiscount(product: number, discount: number, quantity: number): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/productos/descuentos`, {
      idproducto: product,
      cantidad: quantity,
      descuento: discount
    });
  }

  /**
   * Delete a product
   *
   * @returns { Observable<any> } an observable with the response
   */
  public deleteProduct(product: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/productos/del/${product}`, {
    });
  }

  /**
   * Register a product
   *
   * @returns { Observable<any> } an observable with the response
   */
  public registerProduct(formdata: any): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/productos/`, formdata);
  }

  /**
   * delete a coupon for a product
   *
   * @returns { Observable<any> } an observable with the response
   */
  public deleteCoupon(coupon: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/productos/delcupon/${coupon}`, {
    });
  }

  /**
   * delete a discount for a product
   *
   * @returns { Observable<any> } an observable with the response
   */
  public deleteDiscount(discount: number): Observable<any> {
    return this.httpClient.delete(`${this.apiURL}/productos/deldescuento/${discount}`, {
    });
  }

  /**
   * Edit a product
   *
   * @returns { Observable<any> } an observable with the response
   */
  public editProduct(productID: number, name: string, description: string, subCat: number, quantity: number, cost: number, discount: number, condition: string): Observable<any> {
    return this.httpClient.put(`${this.apiURL}/productos/`, {
      id: productID,
      nombre: name,
      descripcion: description,
      subcategoria: subCat,
      stock: quantity,
      costo: cost,
      descuento: discount,
      condicion: condition,
    });
  }

}
