import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './usuario-add.component.html',
  styleUrls: ['./usuario-add.component.scss']
})
export class UsuarioAddComponent implements OnInit {

  constructor(private routeActive: ActivatedRoute) { }

  ngOnInit() {
    //pegando id do param enviado pelo botao editar
    let id = this.routeActive.snapshot.paramMap.get('id'); 

    if (id != null){
      console.info("Valor a ser testado: " + id);
    }
  }

}