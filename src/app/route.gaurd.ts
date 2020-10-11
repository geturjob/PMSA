import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class RouteGaurd implements CanActivate{
    constructor(private route : Router){}
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if(localStorage.getItem('token') != "null" && localStorage.getItem('SiteUserId') != "null")
        {
            return true
        }
        else{
            this.route.navigate(['/']);
            return false;
        }
      }
}