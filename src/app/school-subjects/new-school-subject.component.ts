import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DialogEditSchoolSubject} from './edit-school-subject.component';
import {SchoolService} from '../services/school.services';

export interface DialogNewSchoolSubject {
  schoolSubjectName: string;
  isActive: boolean;
}

@Component({
  selector: 'app-school-subjects',
  templateUrl: './new-school-subject.component.html',
  styleUrls: ['./new-school-subject.component.scss']
})
export class DialogNewSchoolSubjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNewSchoolSubjectComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogNewSchoolSubject, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  addNewSchoolSubject(data) {
    this.schoolService.addNewSchoolSubjects(data.schoolSubjectName, data.isActive).subscribe((data: any) => {
      this.snackBar.open('School subject is successfully added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('School subject is not added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }

}
