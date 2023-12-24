import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getAllProductsApi(){
    return  this.http.get(`${this.SERVER_URL}/products/all`)
  }

  registerApi(user:any){
    return  this.http.post(`${this.SERVER_URL}/user/register`,user)
  }
  loginApi(user:any){
    return  this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  getAProductApi(id:any){
    return  this.http.get(`${this.SERVER_URL}/product/${id}`)

  }
}
