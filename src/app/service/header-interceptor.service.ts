import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class HeaderInterceptorService implements HttpInterceptor {

  //irá interceptar todas as requisições para anexar o token par ao back end
  intercept(
            req: import("@angular/common/http")
                  .HttpRequest<any>, 
            next: import("@angular/common/http")
                  .HttpHandler
          ): import("rxjs")
              .Observable<import("@angular/common/http").HttpEvent<any>> {
                
                //se tiver o token...
                if (localStorage.getItem('token') != null){
                  const token = 'Bearer ' + localStorage.getItem('token');

                  const tokenRequest = req.clone({
                    headers: req.headers.set('Authorization', token)
                  });

                  return next.handle(tokenRequest).pipe(
                    
                    tap((event: HttpEvent<any>) => {
                      if (event instanceof HttpResponse && (event.status === 200 || event.status ===201)){
                        console.info('Sucesso na operacao!');
                      }
                    }),
                    
                    catchError(this.processaError));
                }
                else{ //se nao tiver o token...
                  return next.handle(req).pipe(catchError(this.processaError));
                }    

              }

  constructor() { }

  processaError(error: HttpErrorResponse){
    let errorMessage = 'Error desconhecido';

    if (error.error instanceof ErrorEvent){
      console.error(error.error);
      errorMessage = 'Error: ' + error.error.error;
    }
    else{
      //error.error.error => 'variável error' + 'objeto error do back end' + 'atributo error do objeto do back end'
      errorMessage = 'Código: ' + error.error.code + '\nMensagem: ' + error.error.error;
    }
    window.alert(errorMessage); //mostrar para usuario
    return throwError(errorMessage); //mostrar no navegador
  }
}


@NgModule({
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HeaderInterceptorService,
    multi: true,     
  },],
})

export class HttpInterceptorModule{
  
}