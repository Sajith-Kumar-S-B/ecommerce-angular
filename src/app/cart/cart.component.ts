import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{


  cartItems:any = []
  cartTotalPrice:number = 0
  constructor(private api:ApiService){}
   ngOnInit(): void {
     if(sessionStorage.getItem("token")){
      this.getCart()
     }else{
      this.cartItems = []
     }
   }

   getCart(){
    this.api.getCartApi().subscribe((res:any)=>{
      this.cartItems = res
      this.getTotalCartPrice()
    })
   }

  //  total cart price

  getTotalCartPrice(){
    if(this.cartItems.length>0){
      let total = 0
      this.cartItems.forEach((product:any)=>{
        total += product.grandTotal
      })
     this.cartTotalPrice = Math.ceil(total)
    }else{
      this.cartTotalPrice = 0
    }
  }

  incrementCart(id:any){
     this.api.incrementCartApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        
        this.getCart()
        this.api.getCartCount()
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
     })
  }

  decrementCart(id:any){
    this.api.decrementCartApi(id).subscribe({
     next:(res:any)=>{
      console.log(res);

       this.getCart()
       this.api.getCartCount()
     },
     error:(err:any)=>{
       console.log(err.error);
       
     }
    })
 }
}
