// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
   * Gets the product list
   *
   * @returns { Observable<any> } an observable with the produc list.
   */
  public getProductDetail(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/productos/${id}`);
  }

  /**
   * Gets the product list filtered
   * 
   * @param { boolean } discount The state of the discount
   * @param { boolean } packaged If the product is new
   * @param { boolean } used If the product is used
   *
   * @returns { Observable<any> } an observable with the produc list filtered.
   */
  public getProductsFiltered(discount:boolean, packaged: boolean, used: boolean): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/productos/search`,{
      descuento: discount,
      nuevo: packaged,
      usado: used
    });
  }
}
