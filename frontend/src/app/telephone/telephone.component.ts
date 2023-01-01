import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MyserviceService } from '../myservice.service';
import { Router, ActivatedRoute} from '@angular/router';
import { cards } from '../interfaces/cards';

@Component({
  selector: 'app-telephone',
  templateUrl: './telephone.component.html',
  styleUrls: ['./telephone.component.css']
})
export class TelephoneComponent {
  cards: Array <cards> =[] ;
  cardsForHandset = [];
  cardsForWeb = [];
  add: number = -1 ;
  value:String;
  SelectedValue:String;

  isHandset: boolean = false;
  isHandsetObservable: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return true;
      }

      return false;
    })
  );
  constructor(private breakpointObserver: BreakpointObserver,
    public appService: AppService,
    private _router: Router, 
    private _activatedRoute: ActivatedRoute,
    public myservice: MyserviceService,
    private toaster: ToastrService) {}

    ngOnInit(){
      this.isHandsetObservable.subscribe(currentObserverValue => {
       this.isHandset = currentObserverValue;
       this.loadCards();
      });
  
      this.appService.getTelephones().subscribe(
        response => {
          this.cardsForHandset = response.handsetCards;
          this.cardsForWeb = response.WebCards;
          this.loadCards();
        },
        errors => {
          //alert('There was an error in receiving data from server. Please come again later');
          this.toaster.warning('There was an error in receiving data from server. Please come again later');
        }
      );
    }
  
    loadCards(){
      this.cards = this.isHandset ? this.cardsForHandset : this.cardsForWeb;
    }
  
  
  
    AddToCart(index: number) {
      if (this.myservice.isAuthenticated()){ this.add = +index }
      else 
      {
        this._router.navigate(['../login'], {relativeTo: this._activatedRoute });
      }
    }  
  
    buy(amount: string){
      if (Number(amount) > 0){
        let selectedCard = this.cards[this.add] ;
        let data = {
          ref: selectedCard.ref, 
          title: selectedCard.title ,
          prix: selectedCard.prix,
          amount: amount,
          imageName: selectedCard.imageName,
        }
      this.appService.addToCart(data).subscribe(() => this.add = -1) ;
      }
      else{
        alert('Invalid amount');
      }
       
    }
  
    sort() {
   
      switch ( this.SelectedValue) {
        case "Low":
          {
            let x= this.cards.sort((a,b) => a.prix- b.prix);
            this.cards=x;
            break;
          }
  
        case "High":
          {
            let x= this.cards.sort((a,b) => b.prix - a.prix);
            this.cards=x;
            break;
          }
          default: {
            let x= this.cards.sort((a,b) => a.prix - b.prix);
            this.cards=x;;
            break;
          }
    
        }
        return this.cards;
       }
  
  
  }

