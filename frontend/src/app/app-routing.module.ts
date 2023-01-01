import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { ElectroniquesComponent } from './electroniques/electroniques.component';
import { LoginComponent } from './login/login.component';
import { PCComponent } from './pc/pc.component';
import { RegisterComponent } from './register/register.component';
import { TelephoneComponent } from './telephone/telephone.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './guardes/auth.guard';


const routes: Routes = [
  {path: '',component: PCComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component:RegisterComponent},
    {path: 'pc',component: PCComponent},
    {path: 'electroniques', component: ElectroniquesComponent},
  {path: 'Mes achats',canActivate:[AuthGuard], component: CartComponent},
    {path: 'telephones',component: TelephoneComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
