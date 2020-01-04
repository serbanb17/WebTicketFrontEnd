import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { EventModel } from '../models/event.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UtilsService } from '../services/utils.service';
import { UserModel } from '../models/user.model';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
    events: EventModel[];
    listType: string;
    pageSize: number;
    pageId: number;
    prevBtnDisabled: boolean;
    nextBtnDisabled: boolean;
    myAcc: UserModel;

    constructor(private titleService: Title, private router: Router, private route: ActivatedRoute, private dataService: DataService, private utils: UtilsService) {
        this.titleService.setTitle('Contul tău');
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.listType = this.route.snapshot.params.listType;
        this.pageSize = this.route.snapshot.params.pageSize;
        this.pageId = this.route.snapshot.params.pageId;

        this.dataService.get<EventModel[]>('user/' + this.listType + '/' + this.pageSize + '/' + this.pageId, serverEvents => {
            this.events = serverEvents;
            this.prevBtnDisabled = this.pageId == 0;
            this.nextBtnDisabled = this.events.length < this.pageSize;
        }, error => {
            this.utils.showMessage('A apărut o problemă!');
            console.log(`Error response: ${error}`);
        }, localStorage.getItem('user-token'));

        this.dataService.get<UserModel>('user/who-i-am', user => {
            this.myAcc = user
        }, error => {
            this.utils.showMessage('A apărut o problemă!');
            console.log(`Error response: ${error}`);
        }, localStorage.getItem('user-token'));
    }

    ngOnInit() { }

    changePassBtnClick(): void {
        var newPass: string = (<HTMLInputElement>(document.getElementById("new-pass-input"))).value;
        var passWrap: UserModel = new UserModel();
        passWrap.password = newPass;

        this.dataService.patch<any>('user/change-password', resp => {
            this.utils.showMessage('Parolă schimbată cu success!');
        }, error => {
            this.utils.showMessage('A apărut o problemă!');
            console.log(`Error response: ${error}`);
        }, passWrap, localStorage.getItem('user-token'));
    }
}
