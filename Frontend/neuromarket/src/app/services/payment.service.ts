import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @author Diego Bello
 * @file product.service.ts
 * @description Product service
 */
@Injectable({ providedIn: 'root' })
export class PaymentService {

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
   * register a payment
   *
   * @returns { Observable<any> } an observable with the payment.
   */
  public registerPayment(buyerEmail: string, paymentMethod: string, items: Array<any>): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/compras/comprar`,{
      comprador: buyerEmail,
      metodopago: paymentMethod,
      venta: items
    });
  }
}
