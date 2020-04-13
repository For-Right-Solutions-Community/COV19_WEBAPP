import { Component, Input, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Patient } from '../../../Models/patient.model';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import { MatSort, MatPaginator } from '@angular/material';
import { PriseEnCharge } from '../../../Models/prise-en-charge.model';

@Component({
  templateUrl: './change-status.component.html',
  styleUrls: ['change-status.component.scss'],
})
export class ChangeStatusComponent {
  @Input()patient:Patient;
  dataSource;
  patients:Patient[]=[];
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  priseencharge:PriseEnCharge;
  priseenchargeOptions : PriseEnCharge[]= Object.keys(PriseEnCharge).map(key => PriseEnCharge[key]).filter(value => typeof(value) === "string");
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
    this.patient.priseencharge=this.priseencharge;
    this.patientService.updatePatient(this.patient.id,this.patient).subscribe(
      data => {
        this.reloadPatientListData();
        this.patientService.showlist=true;
        this.close();
      },
      error => {
        console.log(error);
      }
    );  
  }
}
