import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogDeleteEvent {
  eventId: number;
}

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DialogDeleteEventComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteEventComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDeleteEvent, private snackBar: MatSnackBar, private schoolService: SchoolService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'deleted': false});
  }

  deleteEvent() {
    this.schoolService.deleteEvent(this.data.eventId).subscribe((data: any) => {
      this.snackBar.open('Event is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': true});
    }, err => {
      this.snackBar.open('Event is not deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': false});
    });
  }

}
