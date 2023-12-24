import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
    allProducts:any = []
    constructor(private api:ApiService,private toaster:ToasterService){}

    ngOnInit(): void {
      this.api.getAllProductsApi().subscribe((res:any)=>{
        this.allProducts = res
      })
    }

    addToWishlist(product:any){
  if(sessionStorage.getItem("token")){
    this.toaster.showSuccess("Proceed to wishlist")
  }else{
    this.toaster.showWarning('Please Login')
  }
    }
    addToCart(product:any){
      if(sessionStorage.getItem("token")){
        this.toaster.showSuccess("Proceed to cart")
      }else{
        this.toaster.showWarning('please Login')
      }
    }
}
