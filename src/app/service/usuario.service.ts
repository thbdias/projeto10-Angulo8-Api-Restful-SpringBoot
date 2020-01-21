import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../app-constants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private http: HttpClient) { }

  getStudentList(): Observable<any>{
    return this.http.get<any>(AppConstants.baseUrl);
  }

  deletarUsuario(id: Number): Observable<any>{
    return this.http.delete(AppConstants.baseUrl + id, {responseType: 'text'}); //delete do back retorna em formato de texto
  }

  // http://localhost:8080/projeto9-SpringBoot-Api-Rest/usuario/usuarioPorNome/maira
  consultarUsario(nome: String): Observable<any>{
    return this.http.get(AppConstants.baseUrl + "usuarioPorNome/" + nome);
  }
}
