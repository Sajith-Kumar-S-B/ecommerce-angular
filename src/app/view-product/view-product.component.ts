import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit{

  product:any = {}

  constructor(private route:ActivatedRoute, private api:ApiService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      const {id} = res
      // get details of single product
      this.getAProduct(id)

    })
  }
    

  getAProduct(id:any){
    this.api.getAProductApi(id).subscribe({
      next:(res:any)=>{
          this.product = res
          console.log(res);
          
      },
      error:(err:any)=>{
           console.log(err.errors)
      }
    })
  }


  addToWishlist(product:any){
    if(sessionStorage.getItem("token")){
      alert("Proceed to wishlist")
    }else{
      alert('please Login')
    }
      }
      addToCart(product:any){
        if(sessionStorage.getItem("token")){
          alert("Proceed to cart")
        }else{
          alert('please Login')
        }
      }
}
