// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @author Diego Bello
 * @file purchase.service.ts
 * @description purchase service
 */
@Injectable({
  providedIn: 'root'
})
export class PurchaseService {

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
  constructor(private httpClient: HttpClient) {}

  /**
   * Gets the bills list
   *
   * @returns { Observable<any> } an observable with the bills list.
   */
  public getBills(email: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/compras/${email}`);
  }

  /**
   * Gets bill detail
   *
   * @returns { Observable<any> } an observable with the bill detail
   */
  public getBillDetail(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/compras/miscompras/${id}`);
  }
}
