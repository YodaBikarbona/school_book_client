import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogGradeFullInfo {
  gradeInfo: any;
}

@Component({
  selector: 'app-grade-full-info',
  templateUrl: './grade-full-info.component.html',
  styleUrls: ['./grade-full-info.component.scss']
})
export class DialogGradeFullInfoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogGradeFullInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogGradeFullInfo, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
