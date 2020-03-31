import { Component, Input, ViewChild } from '@angular/core';
import { NbWindowRef } from '@nebular/theme';
import { Condition } from '../../../Models/condition.model';
import { Patient } from '../../../Models/patient.model';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import { MatSort, MatPaginator } from '@angular/material';

@Component({
  templateUrl: './change-status.component.html',
  styleUrls: ['change-status.component.scss'],
})
export class ChangeStatusComponent {
  @Input()patient:Patient;
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  condition:Condition;
  conditionOptions : Condition[]= Object.keys(Condition).map(key => Condition[key]).filter(value => typeof(value) === "string");
  constructor(public windowRef: NbWindowRef,private patientService: PatientService) {
  }

  close() {
    this.windowRef.close();
  }
  reloadPatientListData() {
    this.patientService.getPatientsList()
      .subscribe(result => {
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

  onSubmit() {
    console.log(this.condition);
    this.patient.condition=this.condition;
    this.patientService.updatePatient(this.patient.id,this.patient).subscribe(
      data => {
        this.reloadPatientListData();
        this.patientService.showlist = true;
        this.close();
      },
      error => {
        console.log(error);
      }
    ); 
  }
}
