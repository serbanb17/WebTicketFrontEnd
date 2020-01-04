import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
declare var Chartist: any;

class ReviewsInfo {
    nrReviews: number;
    averageRating: number;
    constructor(data: any[]) {
        this.nrReviews = data['item1'];
        this.averageRating = Math.round(data['item2'] * 100) / 100;
    }
}

class LineInfo {
    startDate: string;
    endDate: string;
    total: string;
    constructor(data: string[]) {
        this.startDate = data[0];
        this.endDate = data[1];
        this.total = data[2];
    }
}

class PieInfo {
    subscribedToThisEvent: number;
    subscribedToOthers: number;
    subscribedBoth: number;
    subscribedTotal: number;
    thisRatio: number;
    othersRatio: number;
    bothRatio: number;
    constructor(data: number[]) {
        this.subscribedToThisEvent = data[0];
        this.subscribedToOthers = data[1];
        this.subscribedBoth = data[2];
        this.subscribedTotal = data[0] + data[1] + data[2];
        this.thisRatio = (this.subscribedToThisEvent + 0.0) / this.subscribedTotal * 100;
        this.othersRatio = (this.subscribedToOthers + 0.0) / this.subscribedTotal * 100;
        this.bothRatio = (this.subscribedBoth + 0.0) / this.subscribedTotal / 100;
        this.thisRatio = Math.round(this.thisRatio * 100000) / 100000;
        this.othersRatio = Math.round(this.othersRatio * 100000) / 100000;
        this.bothRatio = Math.round(this.bothRatio * 100000) / 100000;
    }
}

@Component({
  selector: 'app-event-stats',
  templateUrl: './event-stats.component.html',
  styleUrls: ['./event-stats.component.css']
})

export class EventStatsComponent implements OnInit {
    eventId: string;
    reviwesInfo: ReviewsInfo;
    lineInfo: LineInfo;
    pieInfo: PieInfo;

  constructor(private titleService: Title, private route: ActivatedRoute, private dataService: DataService, public utils: UtilsService) { 
    this.titleService.setTitle('Statistici eveniment');
    this.eventId = this.route.snapshot.params.id;

    this.dataService.get<any[]>('event/reviews-stats/' + this.eventId, resp => {
        this.reviwesInfo = new ReviewsInfo(resp);
    }, error => {
        this.utils.showMessage('A apărut o problemă!');
        console.log(`Error response: ${error}`);
    }, localStorage.getItem('user-token'));

    this.dataService.get<any[]>('event/line-chart/' + this.eventId, resp => {
        this.lineInfo = new LineInfo(resp['item2']);
        new Chartist.Line('#chart1', {
            //labels: resp['item2'],
            series: [
              resp['item1']
            ]
          }, {
            fullWidth: true,
            chartPadding: {
              right: 40
            }
          });
          
    }, error => {
        this.utils.showMessage('A apărut o problemă!');
        console.log(`Error response: ${error}`);
    }, localStorage.getItem('user-token'));

    this.dataService.get<number[]>('event/pie-chart/' + this.eventId, resp => {
        this.pieInfo = new PieInfo(resp);
        var sum = function(a, b) { return a + b };
        new Chartist.Pie('#chart2', {
            //labels: ['A', 'B', 'C'],
            series: resp
        }, {
            labelInterpolationFnc: function(value) {
                return ''
            }
        });
    }, error => {
        this.utils.showMessage('A apărut o problemă!');
        console.log(`Error response: ${error}`);
    }, localStorage.getItem('user-token'));
  }

  ngOnInit() {
    
  }

}
