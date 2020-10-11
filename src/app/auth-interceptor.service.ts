import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements  HttpInterceptor{
  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>>{
    console.log('Interceptor');
    if(localStorage.getItem('token') && localStorage.getItem('SiteUserId'))
    {
     const authReq = req.clone({
       setHeaders:{
         token:localStorage.getItem('token'),
         siteuserid : localStorage.getItem('SiteUserId')
       }
     });
     return next.handle(authReq);
    }
    return next.handle(req);
  }

  constructor() { }
}
