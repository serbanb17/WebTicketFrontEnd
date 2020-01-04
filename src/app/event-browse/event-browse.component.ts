import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { EventModel } from '../models/event.model';
import { Title } from '@angular/platform-browser';
import { UtilsService } from '../services/utils.service';

@Component({
    selector: 'app-event-browse',
    templateUrl: './event-browse.component.html',
    styleUrls: ['./event-browse.component.css']
})
export class EventBrowseComponent implements OnInit {
    events: EventModel[];
    pageSize: number;
    pageId: number;
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;

    constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private dataService: DataService, public utils: UtilsService) {
        this.titleService.setTitle('Navigare evenimente');
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.pageSize = this.route.snapshot.params.pageSize;
        this.pageId = this.route.snapshot.params.pageId;
        
        this.dataService.get<EventModel[]>('event/browse/' + this.pageSize + '/' + this.pageId, serverEvents => {
            this.events = serverEvents;
            this.prevBtnDisabled = this.pageId == 0;
            this.nextBtnDisabled = this.events.length < this.pageSize; 
        }, error => {
            this.utils.showMessage('A apărut o problemă!');
            console.log(`Error response: ${error}`);
         });
    }

    ngOnInit() {}
}
