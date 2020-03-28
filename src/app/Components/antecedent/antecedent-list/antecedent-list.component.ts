import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { SmartTableData } from '../../../@core/data/smart-table';
import { LocalDataSource } from 'ng2-smart-table';
import { Antecedent } from '../../../Models/antecedent.model';
import { MatSort, MatPaginator } from '@angular/material';
import { AntecedentService } from '../../../Services/antecedent.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'ngx-antecedent-list',
  templateUrl: './antecedent-list.component.html',
  styleUrls: ['./antecedent-list.component.scss']
})
export class AntecedentListComponent implements OnInit {

  antecedents: Antecedent[] = [];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  dataSource;
  @Output()antecedent : Antecedent= new Antecedent() ;
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
        type: 'Patient',
      },
      diabetic: {
        title: 'Diabétique',
        type: 'boolean',
      },
      cancer: {
        title: 'Cancer',
        type: 'boolean',
      },
      hypertension: {
        title: 'Hypertension',
        type: 'boolean',
      },
      renalFailure: {
        title: 'Insuffisance rénale',
        type: 'boolean',
      },
      immuneDisease: {
        title: 'Maladie immunitaire',
        type: 'boolean',
      },
      heartDisease: {
        title: 'Insuffisance Cardiaque',
        type: 'boolean',
      },
      respiratory: {
        title: 'Insuffisance Respiratoire',
        type: 'boolean',
      },
    },
    hideSubHeader: true,
  };

  constructor(public antecedentService: AntecedentService) {
    this.source = new LocalDataSource(this.antecedents);
  }
  onDeleteConfirm(): void {
    if(this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner une ligne !');
   } 
   else 
   {
     if (window.confirm('Voulez vous supprimé cette fiche ?')) {
    this.deleteAntecedent(this.selectedRows[0].id);
  }
  }
    
  }
  deleteAntecedent(id: number) {
    this.antecedentService.deleteAntecedent(id)
      .subscribe(
        data => {
          this.reloadData();      
        },  
        error => console.log(error));
  }

  ngOnInit() {
    this.reloadData();
    console.log(this.antecedents);
  }

  reloadData() {
    this.antecedentService.getAntecedentsList()
      .subscribe(result => {
        if (!result) {
          return;
        }
        this.source = new LocalDataSource(result);
      });
  }

  
  doRefreshData(event){
    this.antecedentService.showlist = true;
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
    if(this.selectedRows[0] == null )
   {
    Swal.fire('','Il faut sélectionner une ligne !');
   } 
   else 
   {
   this.antecedentService.showedit = true ;
   this.antecedentService.showlist = false; 
   this.antecedent = this.selectedRows[0];
   }error => { console.log("Error while gettig Users details") };
}
//details
showdetails() {    
  if(this.selectedRows[0] == null )
 {
  Swal.fire('','Il faut sélectionner une ligne !');
 } 
 else 
 {
 this.antecedentService.showdetails = true ;
 this.antecedentService.showlist = false;
 this.antecedent = this.selectedRows[0];
 }
  error => { console.log("Error while gettig Users details") };
}
onAntecedentRowSelect(event) {
  this.selectedRows = event.selected;
}
}
