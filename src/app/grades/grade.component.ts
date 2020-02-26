import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

export interface DialogShowDetailsGrade {
  created: string;
  grade: string;
  gradeType: string;
  comment: string;
  professor: string;
  student: string;
  schoolSubject: string;
  schoolClass: string;
}

@Component({
  selector: 'app-grades',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss']
})
export class DialogGradeComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogGradeComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogShowDetailsGrade) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
