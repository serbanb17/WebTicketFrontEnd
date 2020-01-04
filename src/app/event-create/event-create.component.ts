import { Component, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { EventModel } from '../models/event.model';
import { Title } from '@angular/platform-browser';
import { UtilsService } from '../services/utils.service';

import { Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-event-create',
    templateUrl: './event-create.component.html',
    styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
    eventM: EventModel = new EventModel();
    startDate: Date;
    endDate: Date;
    fileToUpload: File = null;

  public progress: number;
  public message: string;

    constructor(private titleService: Title, private router: Router, private dataService: DataService, private utils: UtilsService, private http: HttpClient) {
        this.titleService.setTitle('Creare eveniment');
    }

    ngOnInit() { }

    onSubmit() {
        this.eventM.startDate = this.utils.getStringDate(this.startDate);
        this.eventM.endDate = this.utils.getStringDate(this.endDate);
        
        this.dataService.post<string>('event/create', eventId => {
            this.uploadFile();
            this.utils.showMessage('Evenimentul a fost creat!');
            this.router.navigate(['/user-dashboard/created-events/5/0']);
        }, error => {
            this.utils.showMessage('A apărut o problemă!');
            console.log(`Error response: ${error}`);
        }, this.eventM, localStorage.getItem('user-token'));
    }

    selectFile(files) {
        if (files.length === 0) {
            return;
          }
      
          this.fileToUpload = <File>files[0];
    }

    public uploadFile = () => {
        if(this.fileToUpload == null)
            return;

        const formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
    
        this.dataService.post('event/upload-image', success => {}, error => {
            this.utils.showMessage('A apărut o problemă la încărcarea imaginii!');
            console.log(`Error response: ${error}`);
        }, formData, localStorage.getItem('user-token'));
      }
}
