import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogNewAbsence {
  schoolClassId: number;
  schoolSubjectId: number;
  professorId: number;
  studentId: number;
  isJustified: boolean;
  comment: string;
  title: string;
  schoolSubjects: any;
}

@Component({
  selector: 'app-new-absence',
  templateUrl: './new-absence.component.html',
  styleUrls: ['./new-absence.component.scss']
})
export class DialogNewAbsenceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNewAbsenceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogNewAbsence, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.schoolService.getAllSchoolClassSubjects(this.data.schoolClassId, 0, 0).subscribe((data: any) => {
      this.data.schoolSubjects = data.results;
    }, err => {
    });
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  onChangeSchoolSubject(event) {
    this.data.schoolSubjectId = event.value;
  }

  addAbsence() {
    this.schoolService.newAbsence(this.data.studentId, this.data.schoolClassId, this.data.schoolSubjectId, this.data.comment, this.data.isJustified, this.data.title).subscribe((data: any) => {
      this.snackBar.open('Absence is successfully added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('Absence is not added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }
}
