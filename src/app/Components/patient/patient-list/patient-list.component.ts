import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { PatientService } from '../../../Services/patient.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss']
})
export class PatientListComponent implements OnInit {

  patients: Patient[] = [];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource;
  @Output()patient : Patient= new Patient() ;
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
      phone: {
        title: 'Téléphone',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'string',
      },
      gender: {
        title: 'Genre',
        type: 'string',
      },
      condition: {
        title: 'Etat',
        type: 'string',
      },
    },
    hideSubHeader: true,
  };

  constructor(public patientService: PatientService) {
    this.source = new LocalDataSource(this.patients);
  }
  onDeleteConfirm(): void {
    if(this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner un patient !');
   } 
   else 
   {
     if (window.confirm('Voulez vous supprimé ce patient ?')) {
    this.deletePatient(this.selectedRows[0].id);
  }
  }
    
  }
  deletePatient(id: number) {
    this.patientService.deletePatient(id)
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
    this.patientService.getPatientsList()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.source = new LocalDataSource(result);
        console.log(result)
      });
  }

  
  doRefreshData(event){
    this.patientService.showlist = true;
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
    Swal.fire('','Il faut sélectionner un patient !');
   } 
   else 
   {
   this.patientService.showedit = true ;
   this.patientService.showlist = false; 
   this.patient = this.selectedRows[0];
   }error => { console.log("Error while gettig Users details") };
}
//details
showdetails() {    
  if(this.selectedRows[0] == null )
 {
  Swal.fire('','Il faut sélectionner un patient !');
 } 
 else 
 {
 this.patientService.showdetails = true ;
 this.patientService.showlist = false;
 this.patient = this.selectedRows[0];
 }
  error => { console.log("Error while gettig Users details") };
}
onPatientRowSelect(event) {
  this.selectedRows = event.selected;
}

}
