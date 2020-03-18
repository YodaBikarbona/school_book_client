import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogDeleteSchoolClass {
  schoolClassId: number;
}

@Component({
  selector: 'app-school-class',
  templateUrl: './delete-school-class.component.html',
  styleUrls: ['./delete-school-class.component.scss']
})
export class DialogDeleteSchoolClassComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteSchoolClassComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDeleteSchoolClass, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'deleted': false});
  }

  deleteSchoolSubject() {
    this.schoolService.deleteSchoolClass(this.data.schoolClassId).subscribe((data: any) => {
      this.snackBar.open('School class is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': true});
    }, err => {
      this.snackBar.open('School class is not deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': false});
    });
  }

}
