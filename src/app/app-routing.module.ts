import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { MoviedetailsComponent } from './moviedetails/moviedetails.component';
import { PrivateListComponent } from './privatelist/privatelist.component';
import { PublicListComponent } from './publiclist/publiclist.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'register', component: RegisterComponent },
  { path: 'signin', component: SignInComponent },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'moviedetails/:id',
    component: MoviedetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: 'privatelist',
    component: PrivateListComponent,
    canActivate: [authGuard],
  },
  {
    path: 'publiclist',
    component: PublicListComponent,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'signin' }, // Redirect any unknown routes to sign-in
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
