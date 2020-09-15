import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { CatprofileComponent } from './components/catprofile/catprofile.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [{
  path:'login',
  component:LoginComponent
},
{
  path:'about',
  component:AboutusComponent
},
{
  path: 'catprofiles',
  component: CatprofileComponent
},
{
  path:'logout',
  component:LogoutComponent,
  canActivate:[AuthGuardService]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
