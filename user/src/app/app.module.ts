import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { RouterModule, Router, Routes } from "@angular/router"; 
// import { CarouselModule } from 'angular4-carousel';
import { AppComponent } from './app.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminAuthService } from './services/admin-auth.service';
import { ValidateService } from "./services/validate.service";
import { PosterComponent } from './poster/poster.component';
import { AdminGuard } from "./guard/admin.guard";
import { PosterControlComponent } from './poster-control/poster-control.component';
import { EditPosterComponent } from './edit-poster/edit-poster.component';
import { HomeComponent } from './home/home.component';
import { UserPosterComponent } from './user-poster/user-poster.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// new imports
import { Ng2CarouselamosModule } from 'ng2-carouselamos';

const appRoutes : Routes = [
    {
      path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path:'admin-login',
      component:AdminLoginComponent
    },
    {
      path:'poster',
      component:PosterComponent,
      // canActivate:[AdminGuard]
    },
    {
      path:'poster-control',
      component:PosterControlComponent,
      // canActivate:[AdminGuard]
    },
    {
      path:'edit-poster/:id',
      component:EditPosterComponent,
      // canActivate:[AdminGuard]
    },
    {
      path:'user-poster/:id',
      component:UserPosterComponent,
    },
    {
      path:'**',
      redirectTo:'/home',
    }
]

@NgModule({
  declarations: [
    AppComponent,
    AdminLoginComponent,
    PosterComponent,
    PosterControlComponent,
    EditPosterComponent,
    HomeComponent,
    UserPosterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    NgbModule.forRoot(),
    Ng2CarouselamosModule
  ],
  providers: [ValidateService,AdminAuthService,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
