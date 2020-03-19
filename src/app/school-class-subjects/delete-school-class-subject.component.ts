import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogDeleteSchoolClassSubject {
  schoolClassSubjectId: number;
}

@Component({
  selector: 'app-delete-school-class-subject',
  templateUrl: './delete-school-class-subject.component.html',
  styleUrls: ['./delete-school-class-subject.component.scss']
})
export class DialogDeleteSchoolClassSubjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteSchoolClassSubjectComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDeleteSchoolClassSubject, private snackBar: MatSnackBar, private schoolService: SchoolService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'deleted': false});
  }

  deleteSchoolSubject() {
    this.schoolService.deleteSchoolClassSubject(this.data.schoolClassSubjectId).subscribe((data: any) => {
      this.snackBar.open('School class subject is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': true});
    }, err => {
      this.snackBar.open('School class subject is not successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': false});
    });
  }
}
