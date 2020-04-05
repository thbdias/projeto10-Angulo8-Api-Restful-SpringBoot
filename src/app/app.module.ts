import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './home/home.component'; //requisicoes ajax
import { RouterModule, Routes } from '@angular/router'
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { LoginComponent } from './login/login.component'
import { HttpInterceptorModule } from './service/header-interceptor.service';
import { UsuarioComponent } from './componente/usuario/usuario/usuario.component';
import { UsuarioAddComponent } from './componente/usuario/usuario-add/usuario-add.component';
import { GuardiaoGuard } from './service/guardiao.guard';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

export const appRouters: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard]}, //canActivate -> prote rotas
  {path: 'login', component: LoginComponent},
  {path: '', component: LoginComponent},
  {path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardiaoGuard]}, //canActivate -> prote rotas
  {path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]}, //canActivate -> prote rotas
  {path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]} //canActivate -> prote rotas
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters); 

export const optionMask: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    routes,
    HttpInterceptorModule,
    NgxMaskModule.forRoot(optionMask),
    NgxPaginationModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
