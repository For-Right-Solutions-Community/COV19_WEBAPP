import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { Antecedent } from '../../../Models/antecedent.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AntecedentService } from '../../../Services/antecedent.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-antecedent-details',
  templateUrl: './antecedent-details.component.html',
  styleUrls: ['./antecedent-details.component.scss']
})
export class AntecedentDetailsComponent implements OnInit {

  patients: Patient[] = [];
  antecedents: Antecedent[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdAntecedent = new EventEmitter();
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()antecedent:Antecedent;
  submitted = false;
  registerForm: FormGroup;
  constructor(private antecedentService: AntecedentService,private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getAntecedentsList();
    this.getPatientsList();
    this.registerForm = this.formBuilder.group({
    patient: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }

  getAntecedentsList() {
    this.antecedentService.getAntecedentsList()
    .subscribe(result => {
     this.antecedents = result ;
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
  reloadAntecedentListData() {
    this.antecedentService.getAntecedentsList()
      .subscribe(result => {
        this.antecedents = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  doRefreshData(){
    this.antecedentService.showlist = true;
    this.antecedentService.showdetails = false ;
    this.reloadAntecedentListData();
  }
  goBackToList(){
    this.antecedentService.showlist = true;
    this.antecedentService.showdetails = false ;
  }

}
