import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../Services/user.service';
import { Router } from '@angular/router';
import { User } from '../../../@core/data/users';
import { AppUser } from '../../../Models/user.model';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


  form: any = {};
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit(){
    let userToCreate: AppUser = new AppUser();
    userToCreate.firstname = this.form.firstname;
    userToCreate.lastname = this.form.lastname;
    userToCreate.username = this.form.username;
    userToCreate.cin = this.form.cin;
    userToCreate.password = this.form.password;
    console.log(JSON.stringify(userToCreate));
    this.userService.createUser(userToCreate).subscribe(
      success => {this.router.navigate(['/login']);}
    );

  }

}
