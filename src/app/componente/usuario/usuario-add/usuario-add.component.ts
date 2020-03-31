import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.scss']
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();

  constructor(private routeActive: ActivatedRoute, private usuarioService: UsuarioService) { }

  ngOnInit() {
    //pegando id do param enviado pelo botao editar
    let id = this.routeActive.snapshot.paramMap.get('id'); 

    if (id != null){
      // console.info("Valor a ser testado: " + id);
      this.usuarioService.getStudent(id).subscribe(data => {
        this.usuario = data;
      });
    }
  }

  salvarUsuario(){
    //atualizando ou editando
    if (this.usuario.id != null && this.usuario.id.toString().trim() != null){      
      this.usuarioService.atualizarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("editado: " + data);
      });
    }
    else{ //novo registro            
      this.usuarioService.salvarUsuario(this.usuario).subscribe(data => {
        this.novo();
        console.info("salvo: " + data);
      });
    }
  }

  novo(){
    this.usuario = new User();
  }

  deletarTelefone(id, posicaoTelefone){
    if (id !== null && confirm("Deseja remover?")){
      this.usuarioService.removerTelefone(id).subscribe(data => {        
        this.usuario.telefones.splice(posicaoTelefone, 1); //remove o telefone da lista
        console.info("Telefone removido = " + data);
      });
    }
  }

}
