import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogNewSchoolClass {
  schoolClassName: string;
  schoolYear: string;
  isActive: boolean;
}

@Component({
  selector: 'app-school-class',
  templateUrl: './new-school-class.component.html',
  styleUrls: ['./new-school-class.component.scss']
})
export class DialogNewSchoolClassComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNewSchoolClassComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogNewSchoolClass, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  addNewSchoolClass() {
    this.schoolService.addNewSchoolClass(this.data.schoolClassName, this.data.schoolYear, this.data.isActive).subscribe((data: any) => {
      this.snackBar.open('School class is successfully added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('School class is not added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }

}
