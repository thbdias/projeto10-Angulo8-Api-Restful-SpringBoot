export class AppConstants {

    //método que retornará local do servidor da nossa api
    public static get baseServidor(): string { return "http://localhost:8080/" }

    //context + /login
    public static get baseLogin(): string { return this.baseServidor + "projeto9-SpringBoot-Api-Rest/login" }

    public static get baseUrl(): string { return this.baseServidor + "projeto9-SpringBoot-Api-Rest/usuario/" }
}
