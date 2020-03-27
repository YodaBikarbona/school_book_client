import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogNewGrade {
  grade: number;
  gradeType: string;
  comment: string;
  studentId: number;
  schoolSubjectId: number;
  schoolClassId: number;
}

@Component({
  selector: 'app-new-grade',
  templateUrl: './new-grade.component.html',
  styleUrls: ['./new-grade.component.scss']
})
export class DialogNewGradeComponent implements OnInit {

  chosenGrade = 0;

  constructor(public dialogRef: MatDialogRef<DialogNewGradeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogNewGrade, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  choseGrade(grade) {
    this.data.grade = grade;
    this.chosenGrade = grade;
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  addGrade() {
    this.schoolService.addNewGrade(this.data.grade, this.data.gradeType, this.data.comment, this.data.studentId, this.data.schoolSubjectId, this.data.schoolClassId).subscribe((data: any) => {
      this.snackBar.open('Grade is successfully added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('Grade is not added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    });
  }
}
