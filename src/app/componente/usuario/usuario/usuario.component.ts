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

students: Observable<User[]>;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit() {
    this.usuarioService.getStudentList().subscribe(data => {
      this.students = data;
    });
  }

  //esse método será chamado da tela e chamará o service que chamará o back
  deleteUsuario(id: Number){
    this.usuarioService.deletarUsuario(id).subscribe(data => {
      console.log("Retorno do método delete: " + data);
      //atualizar lista de usuários
      this.usuarioService.getStudentList().subscribe(data => {
        this.students = data;
      });
    });
  }
}
