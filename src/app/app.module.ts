import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { PrivateListComponent } from './privatelist/privatelist.component';
import { MovieService } from './movie.service';
import { AuthService } from './auth.service';
import { PublicListComponent } from './publiclist/publiclist.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    SignInComponent,
    HomeComponent,
    MoviedetailsComponent,
    PrivateListComponent,
    PublicListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [MovieService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
