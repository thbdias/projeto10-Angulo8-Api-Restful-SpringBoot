import { Component, OnInit } from '@angular/core';
import { LoginServiceService } from '../service/login-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = {login: '', senha: ''}

  constructor(private loginService: LoginServiceService, private router: Router){}

  public login(){
    this.loginService.login(this.usuario);
  }

  ngOnInit() {
    //se já tiver o token
    if (localStorage.getItem('token') !== null && 
        localStorage.getItem('token').toString().trim() !== null){
      this.router.navigate(['home']);
    }
  }

}
