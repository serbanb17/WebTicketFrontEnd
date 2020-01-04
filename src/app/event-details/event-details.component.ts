import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EventModel } from '../models/event.model';
import { Title } from '@angular/platform-browser';
import { UtilsService } from '../services/utils.service';

@Component({
    selector: 'app-event-details',
    templateUrl: './event-details.component.html',
    styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {
    eventId: string;
    eventM: EventModel;
    registrationStatus: string;
    googleApiKey: string;

    constructor(private titleService: Title, private route: ActivatedRoute, private dataService: DataService, public utils: UtilsService) {
        this.titleService.setTitle('Detalii eveniment');
        this.eventId = this.route.snapshot.params.id;
        this.googleApiKey = this.dataService.getGoogleMapsAPiKey();
        
        this.dataService.get<EventModel>('event/details/' + this.eventId, serverEvent => {
            this.eventM = serverEvent;
            // this.eventM.image = this.dataService.getImageAbsoluteUrl(this.eventM.image);
            dataService.get<string>('user/registration-status/' + this.eventId, serverRegistrationStatus => {
                this.registrationStatus = serverRegistrationStatus;
                this.showBtns();
            }, error => {
                this.registrationStatus = 'unauthenticated';
                this.showBtns();
                console.log(`Error response: ${error}`);
            }, localStorage.getItem('user-token'));
        }, error => {
            this.utils.showMessage('A apărut o problemă!');
            console.log(`Error response: ${error}`);
         });
    }

    ngOnInit() { }

    showBtns() {
        switch(this.registrationStatus) {
            case ('unauthenticated'): {
                document.getElementById('btnLogin').removeAttribute('hidden');
                break;
            }
            case ('creator'): {
                document.getElementById('btnChat').removeAttribute('hidden');
                document.getElementById('btnCreator').removeAttribute('hidden');
                break;
            }
            case ('registered'): {
                document.getElementById('btnChat').removeAttribute('hidden');
                document.getElementById('btnRegister').removeAttribute('hidden');
                document.getElementById('btnRegister').innerText = 'Ești înscris (anulează)';
                document.getElementById('btnYourReview').style.display = 'inline-block';
                break;
            }
            case ('unregistered'): {
                document.getElementById('btnChat').removeAttribute('hidden');
                document.getElementById('btnRegister').removeAttribute('hidden');
                document.getElementById('btnRegister').innerText = 'Înscrie-te';
                break;
            }
        }
    }

    btnRegisterClick() {
        if (this.registrationStatus == 'unregistered') {

            this.dataService.patch<Boolean>('user/register/' + this.eventId, response => {
                this.registrationStatus = 'registered';
                document.getElementById('btnRegister').innerText = 'Ești înscris (anulează)';
                this.utils.showMessage('Ai fost înscris!');
                document.getElementById('btnYourReview').style.display = 'inline-block';
            }, error => {
                this.utils.showMessage('A apărut o problemă!');
                console.log(`Error response: ${error}`);
            }, undefined, localStorage.getItem('user-token'));

        } else if (this.registrationStatus == 'registered') {

            this.dataService.patch<Boolean>('user/unregister/' + this.eventId, response => {
                this.registrationStatus = 'unregistered';
                document.getElementById('btnRegister').innerText = 'Înscrie-te';
                this.utils.showMessage('Înregistrarea ta a fost anulată!');
                document.getElementById('btnYourReview').style.removeProperty('display');
                document.getElementById('btnYourReview').style.display = 'none';
            }, error => {
                this.utils.showMessage('A apărut o problemă!');
                console.log(`Error response: ${error}`);
            }, undefined, localStorage.getItem('user-token'));

        }
    }
}
