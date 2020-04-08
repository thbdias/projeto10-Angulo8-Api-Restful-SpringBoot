import { Telefone } from './telefone';
import { Profissao } from './profissao';

export class User {
    
    id: Number; //no back esse campo está como Long
    login: String;
    nome: String;
    senha: String
    dataNascimento: String;
    // cpf: String; //aula usa, porem back end nao possui

    telefones: Array<Telefone>; //nome variável igual do back
    profissao: Profissao = new Profissao(); //nome variável igual do back
    salario: DoubleRange; //nome variável igual do back
}
