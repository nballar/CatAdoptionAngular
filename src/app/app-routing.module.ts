import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { CatprofileComponent } from './components/catprofile/catprofile.component';

const routes: Routes = [{
  path:'login',
  component:LoginComponent
},
{
  path:'about',
  component:AboutusComponent
  },
  {
    path: 'catprofiles'
    component: CatprofileComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
