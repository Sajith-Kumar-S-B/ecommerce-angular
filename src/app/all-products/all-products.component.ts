import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit{
   searchString:string=""
    allProducts:any = []
    constructor(private api:ApiService,private toaster:ToasterService){}

    ngOnInit(): void {
      this.api.getAllProductsApi().subscribe((res:any)=>{
        this.allProducts = res
      })
      this.api.searchKey.subscribe((data:any)=>{
        this.searchString = data
      })
    }

   
  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      this.api.AddToWishlistApi(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(`${res.title} added to your wishlist`)
          this.api.getWishlistCount()

        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
  
        }
      })
  
    }else{
      this.toaster.showWarning('Please Login')
    }
      }
    addToCart(product:any){
      if(sessionStorage.getItem("token")){
        Object.assign(product,{quantity:1})
        this.api.addToCartApi(product).subscribe({
          next:(res:any)=>{
            this.toaster.showSuccess(res)
           this.api.getCartCount()

          },
          error:(err:any)=>{
            console.log(err);
            this.toaster.showError(err)
            
          }
        })
      }else{
        this.toaster.showWarning('please Login')
      }
    }
}
