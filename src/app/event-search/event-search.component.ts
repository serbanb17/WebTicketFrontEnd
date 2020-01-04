import { Component, OnInit } from '@angular/core';
import { EventModel } from '../models/event.model';
import { UtilsService } from '../services/utils.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {
    events: EventModel[];
    pageSize: number;
    pageId: number;
    searchText: string;
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;

  constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private dataService: DataService, public utils: UtilsService) {
    this.titleService.setTitle('Căutare evenimente');
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.pageSize = this.route.snapshot.params.pageSize;
    this.pageId = this.route.snapshot.params.pageId;
    this.searchText = this.route.snapshot.params.searchText;

    this.dataService.get<EventModel[]>('event/search/' + this.pageSize + '/' + this.pageId + '/' + this.searchText, serverEvents => {
        this.events = serverEvents;
        this.prevBtnDisabled = this.pageId == 0;
        this.nextBtnDisabled = this.events.length < this.pageSize; 
    }, error => {
        this.utils.showMessage('A apărut o problemă!');
        console.log(`Error response: ${error}`);
     });
   }

  ngOnInit() {
  }

}
