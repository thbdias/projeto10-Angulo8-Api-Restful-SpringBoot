import { Telefone } from './telefone';

export class User {
    
    id: Number; //no back esse campo está como Long
    login: String;
    nome: String;
    senha: String
    // cpf: String; //aula usa, porem back end nao possui

    telefones: Array<Telefone>; //nome variável igual do back
}
