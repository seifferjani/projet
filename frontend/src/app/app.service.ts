import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { cards } from './interfaces/cards';
import { product } from './interfaces/product';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(public httpClient:HttpClient) { }

  getPCs(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/PCs');
  }
  getElectroniques(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/electronique');
  }

  getTelephones(): Observable<any> {
    return this.httpClient.get('http://localhost:3000/tlf');
  }

  addToCart(data: Object){
    return this.httpClient.post('http://localhost:3000/cart', data) ;
  }
  getCarts(): Observable<cards[]> {
    return this.httpClient.get<cards[]>('http://localhost:3000/cart');
  }
  
}