import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogDeleteSchoolSubject {
  schoolSubjectId: number;
}

@Component({
  selector: 'app-school-subjects',
  templateUrl: './delete-school-subject.component.html',
  styleUrls: ['./delete-school-subject.component.scss']
})
export class DialogDeleteSchoolSubjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteSchoolSubjectComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDeleteSchoolSubject, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'deleted': false});
  }

  deleteSchoolSubject() {
    this.schoolService.deleteSchoolSubject(this.data.schoolSubjectId).subscribe((data: any) => {
      this.snackBar.open('School subject is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': true});
    }, err => {
      this.snackBar.open('School subject is not deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': false});
    });
  }
}
