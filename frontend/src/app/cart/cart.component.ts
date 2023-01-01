import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../app.service';
import { cards } from '../interfaces/cards';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: Array <cards> =[] ;

  constructor(private appservice: AppService,
    private toaster:ToastrService) { }

  ngOnInit()  {
    this.appservice.getCarts().subscribe(res => {
      this.cart = res ;
    });
  }
  ShowToaster(){
    this.toaster.success('votre commande est bien enregistrer');
  }

}
