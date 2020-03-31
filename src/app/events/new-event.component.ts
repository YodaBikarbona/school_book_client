import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogNewEvent {
  title: string;
  comment: string;
  date: string;
  schoolClassId: number;
  schoolSubjectId: number;
  hours: string;
  minutes: string
}

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class DialogNewEventComponent implements OnInit {

  schoolClasses: any;
  schoolClassId: number;
  schoolSubjects: any;
  schoolSubjectId: number;

  constructor(public dialogRef: MatDialogRef<DialogNewEventComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogNewEvent, private snackBar: MatSnackBar, private schoolService: SchoolService) { }

  ngOnInit() {
    this.schoolService.getSchoolClassesByProfessor().subscribe((data: any) => {
      this.schoolClasses = data.results;
      }, err => {

    });
  }

  onChangeSchoolClass(event) {
    this.data.schoolClassId = event.value;
    this.schoolSubjects = undefined;
    this.schoolService.getAllSchoolClassSubjects(this.data.schoolClassId, 0, 0).subscribe((data: any) => {
      this.schoolSubjects = data.results;
    }, err => {
    });
    this.data.schoolSubjectId = undefined;
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  onChangeSchoolSubject(event) {
  }

  onChangeDate(event) {
    const tempDateFrom = new Date(event.value);
    const dateString = tempDateFrom.getFullYear() + '-' + (tempDateFrom.getMonth() + 1) + '-' + tempDateFrom.getDate() + 'T' + tempDateFrom.getHours() + ':' + tempDateFrom.getMinutes() + ':' + tempDateFrom.getSeconds() + '.' + tempDateFrom.getMilliseconds();
    this.data.date = dateString.split('T')[0] + ' 12:00';
  }

  addEvent() {
    this.schoolService.newEvent(this.data.schoolClassId, this.data.schoolClassId, this.data.title, this.data.comment, this.data.date).subscribe((date: any) => {
      this.snackBar.open('Event is successfully added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('Event is not added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }

  onChangeHoursMinutes() {
    const tempDate = this.data.date.split(' ')[0];
    this.data.date = tempDate + ' ' + this.data.hours + ':' + this.data.minutes;
  }

}
