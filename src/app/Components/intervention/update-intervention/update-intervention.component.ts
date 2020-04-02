import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { Intervention } from '../../../Models/intervention.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InterventionService } from '../../../Services/intervention.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';
import Swal from 'sweetalert2';

@Component({
  selector: 'ngx-update-intervention',
  templateUrl: './update-intervention.component.html',
  styleUrls: ['./update-intervention.component.scss']
})
export class UpdateInterventionComponent implements OnInit {

  patients: Patient[] = [];
  interventions: Intervention[] = [];
  dataSource;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @Output() createdIntervention = new EventEmitter();
  isSignedUp = false;
  isSignUpFailed = false;
  errorMessage = '';
  @Input()intervention:Intervention;
  submitted = false;
  registerForm: FormGroup;
  constructor(private interventionService: InterventionService,private patientService: PatientService,private formBuilder: FormBuilder) { }
  ngOnInit() {
    this.getInterventionsList();
    this.getPatientsList();
    this.registerForm = this.formBuilder.group({
    patient: ['', Validators.required],
    date: ['', Validators.required],
    description: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
  }
    console.log(this.intervention);
    this.interventionService.updateIntervention(this.intervention.id,this.intervention).subscribe(
      data => {
        console.log(data);
        this.createdIntervention.emit(1);
        this.isSignedUp = true;
        this.isSignUpFailed = false;
        Swal.fire('','L\'intervention est modifée avec succés !');
        this.reset();
        this.reloadInterventionListData();
        this.interventionService.showedit = false ;
        this.interventionService.showlist = true;
      },
      error => {
        console.log(error);
        this.errorMessage = error.error.message;
        this.isSignUpFailed = true;
      }
    ); 
  }
  reset(){
   this.intervention=new Intervention();
   this.submitted = false;
   this.registerForm.reset();
  }

  getInterventionsList() {
    this.interventionService.getInterventionsList()
    .subscribe(result => {
     this.interventions = result ;
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
  reloadInterventionListData() {
    this.interventionService.getInterventionsList()
      .subscribe(result => {
        this.interventions = result;
        this.dataSource = new LocalDataSource(result);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
  }
  doRefreshData(){
    this.interventionService.showlist = true;
    this.interventionService.showedit = false ;
    this.reloadInterventionListData();
  }

  goBackToList(){
    this.interventionService.showlist = true;
    this.interventionService.showedit = false ;
  }

}
