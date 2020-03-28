import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AppUser } from '../../../Models/user.model';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort, MatPaginator } from '@angular/material';
import { Role } from '../../../Models/role.model';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../Services/user.service';

@Component({
  selector: 'ngx-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  users: AppUser[] = [];
  dataSource;
  @ViewChild(NgForm, {static: false}) formuser: NgForm;
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
  doRefreshData(){
    this.userService.showlist = true;
    this.userService.showadd = false ;
    this.reloadUserListData();
  }

}
