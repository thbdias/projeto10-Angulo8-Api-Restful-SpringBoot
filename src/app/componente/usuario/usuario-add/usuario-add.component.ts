import { Component, OnInit, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { User } from 'src/app/model/user';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Telefone } from 'src/app/model/telefone';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class FormataData extends NgbDateParserFormatter{
  
  readonly DELIMITER = '/';

  parse(value: string) : NgbDateStruct | null{    
    if (value){
      let date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      }
    }
    return null;
  }

  format(date: NgbDateStruct) : string | null{
    return date ? validarDiaOuMes(date.day) + this.DELIMITER + validarDiaOuMes(date.month) + this.DELIMITER + date.year : '';
  }

  toModel(date: NgbDateStruct) : string | null {
    return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : null;
  }
}

function validarDiaOuMes(valor) {
  if (valor.toString !== '' && parseInt(valor) <= 9){
    return '0' + valor;
  }
  return valor;
}


@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.scss'],
  providers: [{provide: NgbDateParserFormatter, useClass: FormataData}]
})
export class UsuarioAddComponent implements OnInit {

  usuario = new User();
  telefone = new Telefone();

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
    this.telefone = new Telefone();
  }

  deletarTelefone(id, posicaoTelefone){    
    //tiver adicionando novo telefone e ele não existe no banco de dados ainda...
    if (id == null){
      this.usuario.telefones.splice(posicaoTelefone, 1); //remove o telefone da lista
      return;
    }

    //telefone tem que existir no bando de dados
    if (id !== null && confirm("Deseja remover?")){
      this.usuarioService.removerTelefone(id).subscribe(data => {        
        this.usuario.telefones.splice(posicaoTelefone, 1); //remove o telefone da lista
        console.info("Telefone removido = " + data);
      });
    }
  }

  addFone(){
    //se a lista estiver nula...
    if (this.usuario.telefones === undefined){
      this.usuario.telefones = new Array<Telefone>();
    }

    this.usuario.telefones.push(this.telefone);
    this.telefone = new Telefone();
  }

}
