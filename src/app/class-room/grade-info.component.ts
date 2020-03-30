import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';
import {DialogGradeFullInfoComponent} from './grade-full-info.component';

export interface DialogGradeInfo {
  grades: any;
}

@Component({
  selector: 'app-grade-info',
  templateUrl: './grade-info.component.html',
  styleUrls: ['./grade-info.component.scss']
})
export class DialogGradeInfoComponent implements OnInit, OnDestroy {

  constructor(public dialogRef: MatDialogRef<DialogGradeInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogGradeInfo, private schoolService: SchoolService, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit() {
    console.log(this.data.grades)
  }

  ngOnDestroy(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  openDialogFullGradeInformation(grade): void {
    const dialogRef = this.dialog.open(DialogGradeFullInfoComponent, {
      width: '600px',
      disableClose: true,
      data: {
        gradeInfo: grade,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  displayedColumns: string[] = ['created', 'grade', 'schoolSubject', 'professor', 'showDetails'];

}
