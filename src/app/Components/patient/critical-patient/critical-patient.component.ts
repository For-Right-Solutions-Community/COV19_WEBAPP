import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { PatientService } from '../../../Services/patient.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { NbWindowService } from '@nebular/theme';
import { ChangeStatusSAMUComponent } from '../change-status-samu/change-status-samu.component';

@Component({
  selector: 'ngx-critical-patient',
  templateUrl: './critical-patient.component.html',
  styleUrls: ['./critical-patient.component.scss']
})
export class CriticalPatientComponent implements OnInit {

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
      phone: {
        title: 'Téléphone',
        type: 'string',
      },
      covidscore: {
        title: 'COVID Score',
        type: 'numeric'
      },
      exposure: {
        title: 'COVID Test',
        type: 'string',
        valuePrepareFunction: (value) => {
          if (value==undefined){ return '';}else{
            if(value.hasmakingtest){
              if(value.testResult===true){
                return 'Test positif';
              }else{
                return 'Test négatif';
              }
            }else{
              return 'Aucun test';
            }
          }; 
        }
      },
      'exposure.cluster': {
        title: 'Suspicion cluster',
        type: 'string',
        valuePrepareFunction: (cell,value) => {
          if (value == undefined||value.exposure==undefined) {
            return '';
          }
          else {
            if (value.exposure.contactWithInfectedPerson || value.exposure.withSuspiciousGroup||value.exposure.contactedTravellerTestResult) {
              return 'Oui';
            }
            else {
              return 'Non';
            }
          }
          ;
        },
      },
      condition: {
        title: 'Etat',
        type: 'string',
      },
      priseencharge: {
        title: 'Prise en charge',
        type: 'string',
      },
      priseenchargesamu: {
        title: 'Prise en charge SAMU',
        type: 'string',
      },
      date: {
        title: 'Date',
        type: 'date',
        valuePrepareFunction: (date) => { 
          var raw = new Date(date);
          var formatted = new DatePipe('en_EN').transform(raw, 'dd MMM yyyy  HH:mm');
          return formatted; 
        }

      },
    },
    hideSubHeader: true,
  };

  constructor(public patientService: PatientService,private windowService: NbWindowService) {
    this.source = new LocalDataSource(this.patients);
  }
  onDeleteConfirm(): void {
    if(this.selectedRows==undefined||this.selectedRows[0] == null )
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
          Swal.fire('','Patient supprimé avec succés !');   
        },  
        error => {
          console.log(error);
          Swal.fire('','Vous ne pouvez pas supprimer ce patient car il a des symptomes et/ou des signes vitaux !');
        });
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.patients=[];
    this.patientService.getCriticalPatientsList()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.patients=result;
        this.source = new LocalDataSource(this.patients);
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
    if(this.selectedRows==undefined||this.selectedRows[0] == null )
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
  if(this.selectedRows==undefined||this.selectedRows[0] == null )
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

openWindowForm() {
  const context = { patient: this.patient };
  this.windowService.open(ChangeStatusSAMUComponent, { title: `Prise en charge du patient`, context}); 
}

confirmChangeState(){
  if(this.selectedRows==undefined ||this.selectedRows[0]==null )
 {
  Swal.fire('','Il faut sélectionner un patient !');
 } 
 else 
 {
 this.patient = this.selectedRows[0];
 this.openWindowForm();
 }
}
updatingSymptoms(){
  if(this.selectedRows==undefined ||this.selectedRows[0]==null )
 {
  Swal.fire('','Il faut sélectionner un patient !');
 } 
 else 
 {
 this.patient = this.selectedRows[0];
 this.patientService.showcreatesymptom = true ;
 this.patientService.showlist = false;
 }
}
updatingVitals(){
  if(this.selectedRows==undefined ||this.selectedRows[0]==null )
 {
  Swal.fire('','Il faut sélectionner un patient !');
 } 
 else 
 {
 this.patient = this.selectedRows[0];
 this.patientService.showcreatevital = true ;
 this.patientService.showlist = false;
 }
}
showSymptoms(){
  if(this.selectedRows==undefined ||this.selectedRows[0]==null )
  {
   Swal.fire('','Il faut sélectionner un patient !');
  } 
  else 
  {
  this.patient = this.selectedRows[0];
  this.patientService.showlistsymptom = true ;
  this.patientService.showlist = false;
  }
}

}
