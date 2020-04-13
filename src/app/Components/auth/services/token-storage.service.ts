import { Injectable } from '@angular/core';
import { Role } from '../../../Models/role.model';
 
const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUsername';
const PRINCIPAL_ROLE = 'AuthRole'

 
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  private roles: Array<string> = [];
  constructor() { }
 
  signOut() {
    window.sessionStorage.clear();
  }
  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
 
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
 
  public saveUsername(username: string) {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, username);
  }
 
  public getUsername(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }

  public getRole(): string{
    return sessionStorage.getItem(PRINCIPAL_ROLE);
  }
  
  public saveRole(role: Role){
    window.sessionStorage.setItem(PRINCIPAL_ROLE,role.toString());
  }
}