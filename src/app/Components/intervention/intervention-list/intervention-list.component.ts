import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Intervention } from '../../../Models/intervention.model';
import { MatSort, MatPaginator } from '@angular/material';
import { InterventionService } from '../../../Services/intervention.service';
import Swal from 'sweetalert2';
import { Patient } from '../../../Models/patient.model';
import * as moment from 'moment';

@Component({
  selector: 'ngx-intervention-list',
  templateUrl: './intervention-list.component.html',
  styleUrls: ['./intervention-list.component.scss']
})
export class InterventionListComponent implements OnInit {

  interventions: Intervention[] = [];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource;
  @Output()patient: Patient;
  @Output()intervention : Intervention= new Intervention() ;
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
      patient: {
        title: 'Patient',
        type: 'string',
        valuePrepareFunction: (value) => {
          console.log(value);
          if (value==undefined) return '';
          return value.firstname+" "+value.lastname;
        }
      },
      date: {
        title: 'Date',
        type: 'Date',
        valuePrepareFunction: (value) => {
          if (!value) return '';
          const date=moment(value);
          return date.format('DD/MM/YYYY');
      }  
      }
    },
    hideSubHeader: true,
  };

  constructor(public interventionService: InterventionService) {
    this.source = new LocalDataSource(this.interventions);
  }
  onDeleteConfirm(): void {
    if(this.selectedRows==undefined||this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner une ligne !');
   } 
   else 
   {
     if (window.confirm('Voulez vous supprimé cette fiche ?')) {
    this.deleteIntervention(this.selectedRows[0].id);
  }
  }  
  }
  deleteIntervention(id: number) {
    this.interventionService.deleteIntervention(id)
      .subscribe(
        data => {
          this.reloadData();      
        },  
        error => console.log(error));
  }

  ngOnInit() {
    this.reloadData();
    console.log(this.interventions);
  }

  reloadData() {
    this.interventionService.getInterventionsList()
      .subscribe(result => {
        if (!result) {
          return;
        }
        console.log(result);
        this.source = new LocalDataSource(result);
      });
  }

  
  doRefreshData(event){
    this.interventionService.showlist = true;
    this.reloadData();
  }

  onSearch(query: string = '') {
    if (query == '') {
      this.reloadData();
    }
    this.source.setFilter([
      {
        field: 'patient',
        search: query
      }
    ], false);
  }
  //edit
  showedit(event) {  
    console.log(this.selectedRows);
    if(this.selectedRows==undefined||this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner une ligne !');
   } 
   else 
   {
   this.interventionService.showedit = true ;
   this.interventionService.showlist = false; 
   this.intervention = this.selectedRows[0];
   }error => { console.log("Error while gettig Users details") };
}
//details
showdetails() {  
  console.log(this.selectedRows);   
  if(this.selectedRows==undefined||this.selectedRows[0] == null )
 {
  Swal.fire('','Il faut sélectionner une ligne !');
 } 
 else 
 {
 this.interventionService.showdetails = true ;
 this.interventionService.showlist = false;
 this.intervention = this.selectedRows[0];
 }
  error => { console.log("Error while gettig Users details") };
}
onInterventionRowSelect(event) {
  this.selectedRows = event.selected;
  console.log(event.selected);
}

}
