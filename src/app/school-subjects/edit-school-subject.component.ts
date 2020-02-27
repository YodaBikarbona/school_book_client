import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DialogDeleteSchoolSubject} from './delete-school-subject.component';
import {SchoolService} from '../services/school.services';

export interface DialogEditSchoolSubject {
  schoolSubjectId: number;
  schoolSubjectName: string;
  isActive: boolean;
}

@Component({
  selector: 'app-school-subjects',
  templateUrl: './edit-school-subject.component.html',
  styleUrls: ['./edit-school-subject.component.scss']
})
export class DialogEditSchoolSubjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditSchoolSubjectComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogEditSchoolSubject, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  editSchoolSubject(data) {
    this.schoolService.editSchoolSubject(data.schoolSubjectId, data.schoolSubjectName, data.isActive).subscribe((data: any) => {
      this.snackBar.open('School subject is successfully edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': true});
    }, err => {
      this.snackBar.open('School subject is not edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': false});
    });
  }

}
