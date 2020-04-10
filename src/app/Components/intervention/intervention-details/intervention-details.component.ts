import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Patient } from '../../../Models/patient.model';
import { Intervention } from '../../../Models/intervention.model';
import { MatSort, MatPaginator } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InterventionService } from '../../../Services/intervention.service';
import { PatientService } from '../../../Services/patient.service';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-intervention-details',
  templateUrl: './intervention-details.component.html',
  styleUrls: ['./intervention-details.component.scss']
})
export class InterventionDetailsComponent implements OnInit {
  patient: Patient=new Patient();
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
    if(this.intervention!=undefined&&this.intervention.patient!=undefined){
      this.patient=this.intervention.patient;
      
    }
    this.getPatientsList();
    
    this.registerForm = this.formBuilder.group({
    patient: ['', Validators.required],
    date: ['', Validators.required],
    description: ['', Validators.required]
});
  }
  get f() { return this.registerForm.controls; }

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
     if(this.patients!=undefined&&this.patients.length>0){
      let index = this.patients.findIndex(d => d.id === this.patient.id);
      console.log(index);
      this.patients.splice(index,1);}
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
    this.interventionService.showdetails = false ;
    this.reloadInterventionListData();
  }

  goBackToList(){
    this.interventionService.showlist = true;
    this.interventionService.showdetails = false ;
  }

}
