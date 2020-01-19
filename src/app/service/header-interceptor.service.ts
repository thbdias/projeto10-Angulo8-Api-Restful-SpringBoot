import { Injectable, NgModule } from '@angular/core';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';

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

                  return next.handle(tokenRequest);
                }
                else{ //se nao tiver o token...
                  return next.handle(req);
                }    

              }

  constructor() { }
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