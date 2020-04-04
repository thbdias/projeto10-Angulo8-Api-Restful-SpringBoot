import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

  students: Array<User[]>;
  nome: String;
  totalRegistroBanco: Number;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data.content;
      this.totalRegistroBanco = data.totalElements;
    });
  }

  //esse método será chamado da tela e chamará o service que chamará o back
  deleteUsuario(id: Number, index){
    if (confirm('Deseja mesmo remover?')){
      this.usuarioService.deletarUsuario(id).subscribe(data => {
        this.students.splice(index, 1); //remover da tela
      });
    }
  }

  consultarUsuario(){
    if (this.nome === ''){
      this.usuarioService.getStudentList().subscribe(data => {
        this.students = data.content;
        this.totalRegistroBanco = data.totalElements;
      });
    } else {
      this.usuarioService.consultarUsario(this.nome).subscribe(data => {
        this.students = data.content;
        this.totalRegistroBanco = data.totalElements;
      });
    }    
  }

  carregarPagina(numPaginaAtual){
    if (this.nome !== ''){
      this.usuarioService.consultarUsarioPorPage(this.nome, (numPaginaAtual - 1)).subscribe(data => {
        this.students = data.content;
        this.totalRegistroBanco = data.totalElements;
      });
    } else {
      this.usuarioService.getStudentListPage(numPaginaAtual - 1).subscribe(data => {
        this.students = data.content;
        this.totalRegistroBanco = data.totalElements;
      });
    }
  }
}
