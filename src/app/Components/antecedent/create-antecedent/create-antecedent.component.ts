import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Antecedent } from '../../../Models/antecedent.model';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AntecedentService } from '../../../Services/antecedent.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-create-antecedent',
  templateUrl: './create-antecedent.component.html',
  styleUrls: ['./create-antecedent.component.scss']
})
export class CreateAntecedentComponent implements OnInit {
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
    this.antecedent=new Antecedent();
    this.getPatientsList();
    this.registerForm = this.formBuilder.group({
    patient: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    console.log(this.antecedent);
    this.antecedentService.createAntecedent(this.antecedent).subscribe(
      data => {
        console.log(data);
        this.createdAntecedent.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.antecedentService.showlist = true;
        this.antecedentService.showadd = false ;
        this.reset();
        this.reloadAntecedentListData();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
  }
  reset(){
   this.antecedent=new Antecedent();
   this.submitted = false;
   this.registerForm.reset();
  } 
  @Output() close = new EventEmitter();
  onClose() {
    this.close.emit();
  }

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
    this.antecedentService.showadd = false ;
    this.reloadAntecedentListData();
  }

}
