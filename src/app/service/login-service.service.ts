import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstants } from '../app-constants';
import { error } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: HttpClient) { }

  login(usuario){
    return this.http.post(
                        AppConstants.baseLogin, 
                        JSON.stringify(usuario)
                      )
                      .subscribe(data => {
                        //retorno Http
                        var token = JSON.parse(JSON.stringify(data)).Authorization.split(' ')[1];

                        //armazenar o token atrás do front end / esconder no front end
                        localStorage.setItem("token", token);

                        // console.info("Token: " + localStorage.getItem("token"));
                      },
                      error => {
                        console.error("Erro ao fazer login");
                      });
  }

}
