import { Component, OnInit, HostBinding } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { NotificationService } from '../../Services/notification.service';

@Component({
  selector: 'ngx-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {
  delay = ms => new Promise(res => setTimeout(res, ms));
  audio = new Audio('/assets/images/alert.mp3');
  position:string='top-right';
  status:string='info';
  duration:number=120000;
  @HostBinding('class')
  classes = 'example-items-rows';

  constructor(private toastrService: NbToastrService,private notificationService:NotificationService) { }

  ngOnInit() {
    this.monitornews();
  }

  showToast(position,status,duration) {
    this.toastrService.show(
      'Consultez les nouveaux changements !',
      `Notification`,
      { position, status,duration });
      this.audio.play();
  }

  async monitornews()
    {
        let counter=0;
        let errorcount = 0;
        while(counter<10000)
        {
            counter++;
            try{
                console.log("Start monitring news "+counter);         
                let reponse = await this.notificationService.getResponseFromServer();
                console.log("News Captured");
                console.log(reponse);
                this.showToast(this.position,this.status,this.duration);
           }
           catch(error){
                   console.error(error);
                   errorcount++;
                   if(errorcount>5)
                   {
                    errorcount =0;
                    await this.delay(60000); //wait one minute
                   }
                   else
                   {
                    await this.delay(1000); //wait one second 
                   }
           }
        }
      }

}
