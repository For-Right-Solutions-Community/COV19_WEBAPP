import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { Vital } from '../../../Models/vital.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { VitalService } from '../../../Services/vital.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-update-vital',
  templateUrl: './update-vital.component.html',
  styleUrls: ['./update-vital.component.scss']
})
export class UpdateVitalComponent implements OnInit {

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
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    this.vitalService.updateVital(this.vital.id,this.vital).subscribe(
      data => {
        console.log(data);
        this.createdVital.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','La fiche des signes vitaux est modifiée avec succés !');
        this.reset();
        this.reloadVitalListData();
        this.vitalService.showedit = false ;
        this.vitalService.showlist = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
  }
  reset(){
   this.vital=new Vital();
   this.submitted = false;
   this.registerForm.reset();
  } 
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
    this.vitalService.showedit = false ;
    this.reloadVitalListData();
  }
  goBackToList(){
    this.vitalService.showlist = true;
    this.vitalService.showedit = false ;
  }

}
