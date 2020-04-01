import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { AppUser } from '../../../Models/user.model';
import { UserService } from '../../../Services/user.service';
import { Role } from '../../../Models/role.model';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { LocalDataSource } from 'ng2-smart-table';
import { MatSort,MatPaginator } from '@angular/material';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit {
  users: AppUser[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdUser = new EventEmitter();
  roles:Role;
  roleOptions : Role[]= Object.keys(Role).map(key => Role[key]).filter(value => typeof(value) === "string");
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()user:AppUser;
  submitted = false;
  registerForm: FormGroup;
  constructor(private userService: UserService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getUsersList();
    this.user=new AppUser();
    this.registerForm = this.formBuilder.group({
    username: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    role: ['', Validators.required],
    cin: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
});
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    this.userService.createUser(this.user).subscribe(
      data => {
        console.log(data);
        this.createdUser.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','L\'utilisateur est ajouté avec succés !');
        this.reset();
        this.reloadUserListData();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
  }
  reset(){
   this.user=new AppUser();
   this.submitted = false;
   this.registerForm.reset();
  } 
  getUsersList() {
    this.userService.getUsersList()
    .subscribe(result => {
     this.users = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }
  reloadUserListData() {
    this.userService.getUsersList()
      .subscribe(result => {
        this.users = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
}
