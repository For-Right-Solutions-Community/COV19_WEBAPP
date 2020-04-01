import { Component, OnInit, Output, Input, ViewChild } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { Vital } from '../../../Models/vital.model';
import { MatPaginator, MatSort } from '@angular/material';
import { VitalService } from '../../../Services/vital.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'ngx-vital-list',
  templateUrl: './vital-list.component.html',
  styleUrls: ['./vital-list.component.scss']
})
export class VitalListComponent implements OnInit {

  vitals: Vital[] = [];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource;
  @Output()vital : Vital= new Vital() ;
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
          if (value==undefined) return '';
          return value.firstname+" "+value.lastname;
        }
      },
      measurementDate: {
        title: 'Date',
        type: 'Date',
        valuePrepareFunction: (value) => {
          if (!value) return '';
          const date=moment(value);
          return date.format('DD/MM/YYYY');
      }},
      temperature: {
        title: 'Température',
        type: 'string',
      },
      bloodPressure: {
        title: 'Pression artérielle',
        type: 'string',
      },
      pulse: {
        title: 'Impulsion',
        type: 'string',
      },
      respiratoryRate: {
        title: 'Fréquence respiratoire',
        type: 'string',
      },
    },
    hideSubHeader: true,
  };

  constructor(public vitalService: VitalService) {
    this.source = new LocalDataSource(this.vitals);
  }
  onDeleteConfirm(): void {
    if(this.selectedRows==undefined||this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner une ligne !');
   } 
   else 
   {
     if (window.confirm('Voulez vous supprimé cette fiche ?')) {
    this.deleteVital(this.selectedRows[0].id);
  }
  }
    
  }
  deleteVital(id: number) {
    this.vitalService.deleteVital(id)
      .subscribe(
        data => {
          this.reloadData();      
        },  
        error => console.log(error));
  }

  ngOnInit() {
    this.reloadData();
    console.log(this.vitals);
  }

  reloadData() {
    this.vitalService.getVitalsList()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.source = new LocalDataSource(result);
      });
  }

  
  doRefreshData(event){
    this.vitalService.showlist = true;
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
      },
      {
        field: 'measurementDate',
        search: query
      }
    ], false);
  }
  //edit
  showedit(event) {  
    if(this.selectedRows==undefined||this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner une ligne !');
   } 
   else 
   {
   this.vitalService.showedit = true ;
   this.vitalService.showlist = false; 
   this.vital = this.selectedRows[0];
   }error => { console.log("Error while gettig Users details") };
}
//details
showdetails() {    
  if(this.selectedRows==undefined||this.selectedRows[0] == null )
 {
  Swal.fire('','Il faut sélectionner une ligne !');
 } 
 else 
 {
 this.vitalService.showdetails = true ;
 this.vitalService.showlist = false;
 this.vital = this.selectedRows[0];
 }
  error => { console.log("Error while gettig Users details") };
}
onVitalRowSelect(event) {
  this.selectedRows = event.selected;
}

}
