import { Component, OnInit } from '@angular/core';
import { MyserviceService } from '../myservice.service';
import { Router } from '@angular/router';
import { AppService } from '../app.service';


@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username = '';
  constructor(private myService:MyserviceService,
  private _router: Router) { 
    this.myService.getUserName()
    .subscribe(
      data => this.username= data.toString(),
      error => this._router.navigate(['/main/login'])
    )
  }

  ngOnInit() {
  }

  logout(){
    localStorage.removeItem('token');
    this._router.navigate(['/main/login']);
  }

}
