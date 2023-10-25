import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { UserRegistrationComponent } from './components/user-registration/user-registration.component';
import { ClientRegistrationComponent } from './components/client-registration/client-registration.component';
import { CarsViewComponent } from './components/cars-view/cars-view.component';
import { CarComponent } from './components/car/car.component';
import { TokenGuardAdmin } from './guards/admin.guard';
import { TokenGuardAdminLogin } from './guards/adminLogin.guard';
import { TokenGuardSeller } from './guards/seller.guard';
import { TokenGuardSellerLogin } from './guards/sellerLogin.guard';
import { CombinedTokenGuard } from './guards/combinedLogin.guard';
import { BuyComponent } from './buy/buy.component';



const routes: Routes = [
  {path : '', component : LoginComponent},
  {path : 'header', component : HeaderComponent},
  {path : 'home', component : HomeComponent, canActivate:[CombinedTokenGuard]},
  {path : 'user/registration', component : UserRegistrationComponent, canActivate:[TokenGuardAdmin]},
  {path : 'client/registration', component : ClientRegistrationComponent, canActivate:[CombinedTokenGuard]},
  {path: 'cars', component: CarsViewComponent, canActivate:[CombinedTokenGuard]},
  {path: 'car/:id', component: CarComponent, canActivate:[CombinedTokenGuard]},
  {path: 'buy', component: BuyComponent, canActivate:[CombinedTokenGuard]},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
