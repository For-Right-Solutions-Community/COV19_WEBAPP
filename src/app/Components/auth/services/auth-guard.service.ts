import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  
  roles:string[];
  constructor( private router: Router, private tokenStorage: TokenStorageService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    
    this.roles = this.tokenStorage.getAuthorities();
   
    if (this.tokenStorage.getToken()) {
      // check if route is restricted by role
      this.roles.every(role => {
      if (route.data.roles && route.data.roles.indexOf(role) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/menu']);
        return false;
      }
    });
    
    // authorised so return true
    return true;
    }
    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
}
