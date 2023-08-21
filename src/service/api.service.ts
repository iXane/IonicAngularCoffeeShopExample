import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

// API CLASS //
export class ApiService
{
  constructor(private http: HttpClient)
  {

  }

  //-----------------------//
  // Get the menu prodcuts //
  //-----------------------//
  getMenuProducts()
  {
    console.log('API - Get Store Products');
    return this.http.get('https://dev-07597153u2536s7.api.raw-labs.com/shop/products', { headers: { 'Content-Type': 'application/json' } });
  }

  //---------------------//
  // Get Product Details //
  //---------------------//
  getProductDetails(id : number)
  {
    console.log(`API - Get Product Details -- ID: ${id}`);

    // For the purposes of this project and not having a full programmable API, here I set the URL depending on the static ID //
    
    if (id == 1)
    {
      return this.http.get('https://dev-07597153u2536s7.api.raw-labs.com/shop/product/details%3Fid%3D1',  { headers: { 'Content-Type': 'application/json' } });
    }
    else if (id == 2)
    {
      return this.http.get('https://dev-07597153u2536s7.api.raw-labs.com/shop/product/details%3Fid%3D2',  { headers: { 'Content-Type': 'application/json' } });
    }
    else
    {
      return this.http.get('https://dev-07597153u2536s7.api.raw-labs.com/shop/product/details%3Fid%3D3',  { headers: { 'Content-Type': 'application/json' } });
    }
  }
}
