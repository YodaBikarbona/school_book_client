import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogEditAbsences {
  created: number;
  schoolSubject: string;
  schoolSubjectId: number;
  professor: string;
  professorId: number;
  student: string;
  studentId: number;
  absenceId: number;
  isJustified: boolean;
  comment: string;
  title: string;
}

@Component({
  selector: 'app-edit-absence',
  templateUrl: './edit-absence.component.html',
  styleUrls: ['./edit-absence.component.scss']
})
export class DialogEditAbsenceComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditAbsenceComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogEditAbsences, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  editAbsence() {
    this.schoolService.editAbsence(this.data.absenceId, this.data.comment, this.data.isJustified, this.data.title).subscribe((data: any) => {
      this.snackBar.open('Absence is successfully edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': true});
    }, err => {
      this.snackBar.open('Absence is not edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': false});
    });
  }

}
