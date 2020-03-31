import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../services/school.services';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events: any;
  eventsLength = 0;

  constructor(private schoolService: SchoolService) {
  }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.schoolService.getAllParentEvents().subscribe((data: any) => {
      this.events = data.results;
      if (this.events && this.events.length > 0) {
        for (let i = 0; i < this.events.length; i++) {
          const created = this.events[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.events[i].created = date + ' ' + time;
          const eventDate = this.events[i].date.split('T');
          const eDate = eventDate[0];
          const eTime = eventDate[1].split('Z')[0];
          this.events[i].date = eDate + ' ' + eTime;
        }
        this.eventsLength = this.events.length;
      }
    }, err => {

    });
  }

}
