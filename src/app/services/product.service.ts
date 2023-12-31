import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  getProducts()
  {
    return this.http.get<any>("https://fakestoreapi.com/products")
    // .pipe(map( (response: any) => { return response; } ));
  }
}
