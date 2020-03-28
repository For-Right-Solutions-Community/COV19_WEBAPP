import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { Profession } from '../../../Models/profession.model';
import { Condition } from '../../../Models/condition.model';
import { CivilStatus } from '../../../Models/civil-status.model';
import { Gender } from '../../../Models/gender.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-update-patient',
  templateUrl: './update-patient.component.html',
  styleUrls: ['./update-patient.component.scss']
})
export class UpdatePatientComponent implements OnInit {

  handicape:boolean=false;
  visitCountry:boolean=false;
  contact:boolean=false;
  covidTest:boolean=false;
  patients: Patient[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdPatient = new EventEmitter();
  professionOptions : Profession[]= Object.keys(Profession).map(key => Profession[key]).filter(value => typeof(value) === "string");
  conditionOptions : Condition[]= Object.keys(Condition).map(key => Condition[key]).filter(value => typeof(value) === "string");
  civilOptions : CivilStatus[]= Object.keys(CivilStatus).map(key => CivilStatus[key]).filter(value => typeof(value) === "string");
  genderOptions : Gender[]= Object.keys(Gender).map(key => Gender[key]).filter(value => typeof(value) === "string");

  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()patient:Patient;
  submitted = false;
  registerForm: FormGroup;
  constructor(private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getPatientsList();
    this.registerForm = this.formBuilder.group({
    gender: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.required],
    civilStatus: ['', Validators.required],
    age: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    this.patientService.updatePatient(this.patient.id,this.patient).subscribe(
      data => {
        console.log(data);
        this.createdPatient.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        this.patientService.showlist = true;
        this.patientService.showedit = false ;
        this.reset();
        this.reloadPatientListData();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
  }
  reset(){
   this.patient=new Patient();
   this.submitted = false;
   this.registerForm.reset();
  } 
  @Output() close = new EventEmitter();
  onClose() {
    this.close.emit();
  }

  getPatientsList() {
    this.patientService.getPatientsList()
    .subscribe(result => {
     this.patients = result ;
  },
  err => console.log("Message erreur" +  err.message  ))
  }
  reloadPatientListData() {
    this.patientService.getPatientsList()
      .subscribe(result => {
        this.patients = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  doRefreshData(){
    this.patientService.showlist = true;
    this.patientService.showedit = false ;
    this.reloadPatientListData();
  }

}
