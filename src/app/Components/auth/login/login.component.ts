import { Component, OnInit } from '@angular/core';
import { AuthLoginInfo } from '../models/login.model';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import { Router } from '@angular/router';


@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {};
  public isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  private loginInfo: AuthLoginInfo;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private router: Router) {

     }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getAuthorities();
      
        }
    } 
  onSubmit() {
    //console.log(this.form);
    this.loginInfo = new AuthLoginInfo(
      this.form.username,
      this.form.password);

    this.authService.attemptAuth(this.loginInfo).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUsername((data.details as any).username);
        this.tokenStorage.saveAuthorities((data.details as any).authorities);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getAuthorities();
       // console.log(data);
      },
      error => {
        //console.log(error);
        this.errorMessage = error.error.message;
        this.isLoginFailed = true;
      }
    );
    if (this.isLoggedIn){
     // console.log(Global.bdName);
      this.router.navigate(['/']);
    }
  }
}
