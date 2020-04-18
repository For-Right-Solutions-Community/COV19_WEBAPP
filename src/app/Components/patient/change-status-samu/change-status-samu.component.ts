import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { NbWindowRef } from '@nebular/theme';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import { PriseEnChargeSAMU } from '../../../Models/prise-en-charge-samu.model';

@Component({
  selector: 'ngx-change-status-samu',
  templateUrl: './change-status-samu.component.html',
  styleUrls: ['./change-status-samu.component.scss']
})
export class ChangeStatusSAMUComponent{
  @Input()patient:Patient;
  dataSource;
  patients:Patient[]=[];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  priseencharge:PriseEnChargeSAMU;
  priseenchargeOptions : PriseEnChargeSAMU[]= Object.keys(PriseEnChargeSAMU).map(key => PriseEnChargeSAMU[key]).filter(value => typeof(value) === "string");
  constructor(public windowRef: NbWindowRef,private patientService: PatientService) {
  }

  close() {
    this.windowRef.close();
  }
  reloadPatientListData() {
    this.patients=[];
    this.patientService.getPatientsList()
    .subscribe(result => {
        this.patients=result;
        this.dataSource = new LocalDataSource(this.patients);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  onSubmit() {
    console.log(this.priseencharge);
    this.patient.priseenchargesamu=this.priseencharge;
    this.patientService.updatePatient(this.patient.id,this.patient).subscribe(
      data => {
        this.reloadPatientListData();
        this.patientService.showlist=true;
        this.close();
        console.log(data);
      },
      error => {
        console.log(error);
      }
    );  
  }

}
