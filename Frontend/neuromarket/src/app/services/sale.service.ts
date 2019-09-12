// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @author Diego Bello
 * @file sale.service.ts
 * @description Sales service.
 */
@Injectable({
  providedIn: 'root'
})
export class SaleService {

  /**
   * Variable for the API roou URL
   * 
   * @type { string }
   */
  apiURL: string = 'http://127.0.0.1:8000';

  /**
   * Creates and instance of the httpClient
   * 
   * @param { HttpClient } httpClient the HttpClient to make request calls
   */
  constructor( private httpClient: HttpClient ) { }

  /**
   * Get the sales list
   * 
   * @param { string } email The user email
   * 
   * @returns { Observable<any> } an observable with the produc list filtered.
   */
  public getSales(email: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/compras/misventas/${email}`)
  }
}
