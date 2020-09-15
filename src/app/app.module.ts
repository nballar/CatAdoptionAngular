import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CatprofileComponent } from './components/catprofile/catprofile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    AboutusComponent,
    RegisterComponent,
    HomepageComponent,
    CatprofileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
<<<<<<< HEAD
    FormsModule
=======
    HttpClientModule
>>>>>>> 28caf5cfbb4acfaf8df65b51318df10ccf7bb178
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
