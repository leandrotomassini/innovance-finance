import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegistrarseComponent } from './registrarse/registrarse.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrarseComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AuthModule { }
