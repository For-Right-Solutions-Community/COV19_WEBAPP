import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Symptom } from '../../../Models/symptom.model';
import { Patient } from '../../../Models/patient.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SymptomService } from '../../../Services/symptom.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';
import { Exposure } from '../../../Models/exposure.model';

@Component({
  selector: 'ngx-create-symptom',
  templateUrl: './create-symptom.component.html',
  styleUrls: ['./create-symptom.component.scss']
})
export class CreateSymptomComponent implements OnInit {
  checkexposure:boolean=false;
  visitCountry:boolean=false;
  covidTest:boolean=false;
  visitRegion:boolean=false;
  exposure:Exposure;
  patients: Patient[] = [];
  symptoms: Symptom[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdSymptom = new EventEmitter();
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()symptom:Symptom;
  submitted = false;
  registerForm: FormGroup;
  constructor(private symptomService: SymptomService,private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getSymptomsList();
    this.symptom=new Symptom();
    this.exposure=new Exposure();
    this.getPatientsList();
    this.registerForm = this.formBuilder.group({
    patient: ['', Validators.required],
    date: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    console.log(this.symptom);
    this.symptom.exposure=this.exposure;
    this.symptomService.createSymptom(this.symptom).subscribe(
      data => {
        console.log(data);
        this.createdSymptom.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','La fiche des symptômes est ajoutée avec succés !');
        this.reset();
        this.reloadSymptomListData();
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
  }
  reset(){
   this.symptom=new Symptom();
   this.submitted = false;
   this.registerForm.reset();
  } 
  getSymptomsList() {
    this.symptomService.getSymptomsList()
    .subscribe(result => {
     this.symptoms = result ;
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
  reloadSymptomListData() {
    this.symptomService.getSymptomsList()
      .subscribe(result => {
        this.symptoms = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }

}
