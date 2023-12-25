import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit{

  wishlistProducts:any = []
   constructor(private api:ApiService,private toaster:ToasterService){

   }
  ngOnInit(): void {
    this.getWishlist()
  }
   
  getWishlist(){
    this.api.getWishlistApi().subscribe((res:any)=>{
      this.wishlistProducts = res
      this.api.getWishlistCount()
    })
  }

  removeFromWishlist(id:any){
    this.api.removeFromWishlistApi(id).subscribe({
      next:(res:any)=>{
        this.getWishlist()
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  addToCart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addToCartApi(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(res)
         this.api.getCartCount()
         this.removeFromWishlist(product._id)

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
