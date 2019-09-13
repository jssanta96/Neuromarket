// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @author Diego Bello
 * @file croduct.service.ts
 * @description Category service
 */
@Injectable({ providedIn: 'root' })
export class CategoryService {

  /**
   * Variable for the API root url
   *
   * @type { string }
   */
  apiURL: string = 'http://127.0.0.1:8000'

  httpHeaders = new HttpHeaders({'Content-Type':'application/json',
  'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*'});

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
  public getCategories(): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/categorias`, { headers:this.httpHeaders });
  }
}
