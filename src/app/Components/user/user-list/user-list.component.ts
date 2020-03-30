import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { MatSort,MatPaginator } from '@angular/material';
import { AppUser } from '../../../Models/user.model';
import { UserService } from '../../../Services/user.service';
import Swal from "sweetalert2";

@Component({
  selector: 'ngx-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: AppUser[] = [];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource;
  @Output()user : AppUser= new AppUser() ;
  source: LocalDataSource = new LocalDataSource();
  data: any;
  LocalDataSource: LocalDataSource;
  selectedRows: any;

  settings = {
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      delete: false,
      add: false,
      edit: false,
      position: 'left'  
    },
    columns: {
      firstname: {
        title: 'Prénom',
        type: 'string',
      },
      lastname: {
        title: 'Nom',
        type: 'string',
      },
      cin: {
        title: 'CIN',
        type: 'string',
      },
      username: {
        title: 'Login',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      role: {
        title: 'Role',
        type: 'string',
      },
    },
    hideSubHeader: true,
  };

  constructor(public userService: UserService) {
    this.source = new LocalDataSource(this.users);
  }
  onDeleteConfirm(): void {
    if(this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner un utilsateur !');
   } 
   else 
   {
     if (window.confirm('Voulez vous supprimé cet utilsateur ?')) {
    this.deleteUser(this.selectedRows[0].id);
  }
  }
    
  }
  deleteUser(id: number) {
    this.userService.deleteUser(id)
      .subscribe(
        data => {
          this.reloadData();      
        },  
        error => console.log(error));
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.userService.getUsersList()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.source = new LocalDataSource(result);
      });
  }

  
  doRefreshData(event){
    this.userService.showlist = true;
    this.reloadData();
  }

  onSearch(query: string = '') {
    if (query == '') {
      this.reloadData();
    }
    this.source.setFilter([
      {
        field: 'username',
        search: query
      },
      {
        field: 'cin',
        search: query
      },
      {
        field: 'email',
        search: query
      }
      ,
      {
        field: 'lastname',
        search: query
      },
      {
        field: 'firstname',
        search: query
      },
      {
        field: 'role',
        search: query
      }
    ], false);
  }
  //edit
  showedit(event) {  
    if(this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner un utilsateur !');
   } 
   else 
   {
   this.userService.showedit = true ;
   this.userService.showlist = false; 
   this.user.id = this.selectedRows[0].id;
   this.user.firstname = this.selectedRows[0].firstname;
   this.user.lastname = this.selectedRows[0].lastname;
   this.user.email = this.selectedRows[0].email;
   this.user.username = this.selectedRows[0].username;
   this.user.role = this.selectedRows[0].role;
   this.user.cin = this.selectedRows[0].cin;
   }error => { console.log("Error while gettig Users details") };
}
//details
showdetails() {    
  if(this.selectedRows[0] == null )
 {
  Swal.fire('','Il faut sélectionner un utilsateur !');
 } 
 else 
 {
 this.userService.showdetails = true ;
 this.userService.showlist = false;
 this.user = this.selectedRows[0];
 }
  error => { console.log("Error while gettig Users details") };
}
onUserRowSelect(event) {
  this.selectedRows = event.selected;
}

}
