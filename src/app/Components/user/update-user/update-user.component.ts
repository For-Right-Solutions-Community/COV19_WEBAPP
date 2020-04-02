import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSort, MatPaginator } from '@angular/material';
import { Role } from '../../../Models/role.model';
import { AppUser } from '../../../Models/user.model';
import { LocalDataSource } from 'ng2-smart-table';
import { UserService } from '../../../Services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
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
    email: ['', [Validators.required, Validators.email]]
});
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      console.log(this.user);
      return;
  }
    console.log(this.user);
    this.userService.updateUser(this.user.id,this.user).subscribe(
      data => {
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','L\'utilisateur est modifié avec succés !');
        this.reset();
        this.reloadUserListData();
        this.userService.showedit = false ;
        this.userService.showlist = true;
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
  doRefreshData(){
    this.userService.showlist = true;
    this.userService.showedit = false ;
    this.reloadUserListData();
  }

  goBackToList(){
    this.userService.showlist = true;
    this.userService.showedit = false ;
  }

}
