import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/school.services';
import {DialogDeleteEventComponent} from './delete-event.component';
import {MatDialog} from '@angular/material';
import {DialogNewEventComponent} from './new-event.component';

@Component({
  selector: 'app-professor-events',
  templateUrl: './professor-events.component.html',
  styleUrls: ['./professor-events.component.scss']
})
export class ProfessorEventsComponent implements OnInit {

  events: any;
  eventsLength = 0;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllEvents();
  }

  getAllEvents() {
    this.schoolService.getAllEvents().subscribe((data: any) => {
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

  openDialogDeleteEvent(request): void {
    const dialogRef = this.dialog.open(DialogDeleteEventComponent, {
      width: '300px',
      disableClose: true,
      data: {eventId: request.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted === true) {
        this.getAllEvents();
      }
    });
  }

  openDialogNewEvent(): void {
    const dialogRef = this.dialog.open(DialogNewEventComponent, {
      width: '600px',
      disableClose: true,
      data: {
        title: '',
        comment: '',
        date: '',
        schoolClassId: null,
        schoolSubjectId: null,
        hours: '12',
        minutes: '00'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.getAllEvents();
      }
    });
  }

  displayedColumns: string[] = ['created', 'date', 'title', 'schoolClass', 'schoolSubject', 'deleteEvent'];

}
