// Dependencies
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  /**
   * Variable for the API root url
   *
   * @type { string }
   */
  apiURL: string = 'http://127.0.0.1:8000'

  /**
   * Creates an instance of StoreService.
   *
   * @param { HttpClient } httpClient The HttpClient to make request calls.
   */
  constructor(private httpClient: HttpClient) { }

  /**
   * Gets the store state
   *
   * @returns { Observable<any> } an observable with the state.
   */
  public getStoreState(email: string): Observable<any> {
    return this.httpClient.get(`${this.apiURL}/tienda/validar/${email}`);
  }

  /**
   * Create an store
   *
   * @returns { Observable<any> } an observable with the response
   */
  public createStore(email: string, name: string): Observable<any> {
    return this.httpClient.post(`${this.apiURL}/tienda/`,{
      correousuario: email,
      nombre: name
    });
  }
}
