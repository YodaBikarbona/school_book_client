import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogEditSchoolClassSubject {
  schoolClassSubjectId: number;
  isActive: boolean;
  subjectName: string;
  professorFirstName: string;
  professorLastName: string;
  professorEmail: string;
}

@Component({
  selector: 'app-edit-school-class-subject',
  templateUrl: './edit-school-class-subject.component.html',
  styleUrls: ['./edit-school-class-subject.component.scss']
})
export class DialogEditSchoolClassSubjectComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditSchoolClassSubjectComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogEditSchoolClassSubject, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  activateOrDeactivate() {
    this.schoolService.activateOrDeactivateSchoolClassSubject(this.data.schoolClassSubjectId, this.data.isActive).subscribe((data: any) => {
      this.snackBar.open('School class subject is successfully edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': true});
    }, err => {
      this.snackBar.open('School class subject is not edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': false});
    });
  }

}
