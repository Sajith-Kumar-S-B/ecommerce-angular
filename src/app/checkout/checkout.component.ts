import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import {IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  public payPalConfig ? : IPayPalConfig;
  totalAmount:string =""
  proceedtoBuyStatus:boolean = false
  proceedToPaymentStatus:boolean = false
  checkoutForm = this.fb.group({
    uname:['',[Validators.required,Validators.pattern('[a-zA-Z ]*')]],
    flat:['',[Validators.required,Validators.pattern('[a-zA-Z0-9.:, ]*')]],
    place:['',[Validators.required,Validators.pattern('[a-zA-Z., ]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  constructor(private fb:FormBuilder,private toaster:ToasterService,private api:ApiService,private router:Router){}
  cancel(){
    this.checkoutForm.reset()
  }
  proceedToBuy(){
    if(this.checkoutForm.valid){
   this.proceedtoBuyStatus = true
   if(sessionStorage.getItem('total')){
    this.totalAmount = sessionStorage.getItem("total") || ""
   }
    }else{
      this.toaster.showWarning("Invalid details")
    }
  }
  back(){
    this.proceedtoBuyStatus = false
  }

  proceedToPayment(){
    this.proceedToPaymentStatus = true
    this.initConfig()
  }


  private initConfig(): void {
    this.payPalConfig = {
        currency: 'USD',
        clientId: 'sb',
        createOrderOnClient: (data) => < ICreateOrderRequest > {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD',
                    value: this.totalAmount,
                    breakdown: {
                        item_total: {
                            currency_code: 'USD',
                            value: this.totalAmount
                        }
                    }
                }
            }]
        },
        advanced: {
            commit: 'true'
        },
        style: {
            label: 'paypal',
            layout: 'vertical'
        },
        onApprove: (data, actions) => {
            console.log('onApprove - transaction was approved, but not authorized', data, actions);
            actions.order.get().then((details:any) => {
                console.log('onApprove - you can get full order details inside onApprove: ', details);
            });

        },
        onClientAuthorization: (data) => {
            console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
            this.api.emptyCartApi().subscribe((res:any)=>{
              this.api.getCartCount()
              this.toaster.showSuccess("Payment is Successful..Thank you for purchasing")
              this.proceedtoBuyStatus = false
              this.proceedToPaymentStatus = false
              this.checkoutForm.reset()
              this.router.navigateByUrl("/")
            })
        },
        onCancel: (data, actions) => {
            console.log('OnCancel', data, actions);
         this.toaster.showWarning("Transaction has been cancelled")
      this.proceedToPaymentStatus = false
        },
        onError: err => {
            console.log('OnError', err);
            this.toaster.showError("Transaction failed")
            this.proceedToPaymentStatus = false

        },
        onClick: (data, actions) => {
            console.log('onClick', data, actions);
        }
    };
}
}
