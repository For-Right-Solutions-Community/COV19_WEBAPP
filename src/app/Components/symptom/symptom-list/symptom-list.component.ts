import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { SmartTableData } from '../../../@core/data/smart-table';
import { Symptom } from '../../../Models/symptom.model';
import { MatSort, MatPaginator } from '@angular/material';
import { SymptomService } from '../../../Services/symptom.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'ngx-symptom-list',
  templateUrl: './symptom-list.component.html',
  styleUrls: ['./symptom-list.component.scss']
})
export class SymptomListComponent implements OnInit {

  symptoms: Symptom[] = [];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource;
  @Output()symptom : Symptom= new Symptom() ;
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
      date: {
        title: 'Date',
        type: 'Date',
        valuePrepareFunction: (value) => {
          if (!value) return '';
          const date=moment(value);
          return date.format('DD/MM/YYYY');
      }
    },
    },
    hideSubHeader: true,
  };

  constructor(public symptomService: SymptomService) {
    this.source = new LocalDataSource(this.symptoms);
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
    this.symptomService.deleteSymptom(id)
      .subscribe(
        data => {
          this.reloadData();      
        },  
        error => console.log(error));
  }

  ngOnInit() {
    this.reloadData();
    console.log(this.symptoms);
  }

  reloadData() {
    this.symptomService.getSymptomsList()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.source = new LocalDataSource(result);
      });
  }

  
  doRefreshData(event){
    this.symptomService.showlist = true;
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
        field: 'date',
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
   this.symptomService.showedit = true ;
   this.symptomService.showlist = false; 
   this.symptom = this.selectedRows[0];
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
 this.symptomService.showdetails = true ;
 this.symptomService.showlist = false;
 this.symptom = this.selectedRows[0];
 }
  error => { console.log("Error while gettig Users details") };
}
onSymptomRowSelect(event) {
  this.selectedRows = event.selected;
  console.log(event.selected);
}

}
