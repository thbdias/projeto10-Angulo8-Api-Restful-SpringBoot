import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'Curso-Angular-REST';

  constructor (private router: Router){}

  ngOnInit(): void {
    //se ao iniciar tela não tiver token
    if (localStorage.getItem('token') == null){
      this.router.navigate(['login']); // manda pra tela de login
    }
  }  

  //ao clicar no botao sair
  public sair(){
    localStorage.clear();
    this.router.navigate(['login']);    
  }

  public esconderBarra(){
    //se tiver logado mostre barra
    if (localStorage.getItem('token') !== null && 
        localStorage.getItem('token').toString().trim() !== null){
      return false;
    }
    else{ //se deslogou esconda barra -> tela de login
      return true;
    }
  }

}
