import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { Vital } from '../../../Models/vital.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VitalService } from '../../../Services/vital.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-vital-details',
  templateUrl: './vital-details.component.html',
  styleUrls: ['./vital-details.component.scss']
})
export class VitalDetailsComponent implements OnInit {

  patients: Patient[] = [];
  vitals: Vital[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdVital = new EventEmitter();
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()vital:Vital;
  submitted = false;
  registerForm: FormGroup;
  constructor(private vitalService: VitalService,private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getVitalsList();
    this.getPatientsList();
    this.registerForm = this.formBuilder.group({
    patient: ['', Validators.required],
    measurementDate: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }

  getVitalsList() {
    this.vitalService.getVitalsList()
    .subscribe(result => {
     this.vitals = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }
  getPatientsList() {
    this.patientService.getPatientsList()
    .subscribe(result => {
     this.patients = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }
  reloadVitalListData() {
    this.vitalService.getVitalsList()
      .subscribe(result => {
        this.vitals = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  doRefreshData(){
    this.vitalService.showlist = true;
    this.vitalService.showdetails = false ;
    this.reloadVitalListData();
  }
  goBackToList(){
    this.vitalService.showlist = true;
    this.vitalService.showdetails = false ;
  }

}
