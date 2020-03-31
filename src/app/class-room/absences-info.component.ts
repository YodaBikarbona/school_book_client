import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';
import {DialogEditAbsenceComponent} from './edit-absence.component';

export interface DialogAbsences {
  schoolClassId: number;
  studentId: number;
  absences: any;
}

@Component({
  selector: 'app-absences-info',
  templateUrl: './absences-info.component.html',
  styleUrls: ['./absences-info.component.scss']
})
export class DialogAbsencesInfoComponent implements OnInit {

  justifiedAbsences = 0;
  unjustifiedAbsences = 0;

  constructor(public dialogRef: MatDialogRef<DialogAbsencesInfoComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogAbsences, private schoolService: SchoolService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllAbsences();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getAllAbsences() {
    this.schoolService.getAllAbsences(this.data.schoolClassId, this.data.studentId, 0, 'null').subscribe((data: any) => {
      this.data.absences = data.results;
      if (this.data.absences !== undefined) {
        for (let i = 0; i < this.data.absences.length; i++) {
          const created = this.data.absences[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.data.absences[i].created = date + ' ' + time;
        }
      }
    }, err => {

    });
    this.schoolService.getAllAbsencesNumber(this.data.schoolClassId, this.data.studentId, 0).subscribe((data: any) => {
      this.justifiedAbsences = data.justified_absences;
      this.unjustifiedAbsences = data.unjustified_absences;
    }, err => {

    });
  }

  openDialogAbsence(absence): void {
    const dialogRef = this.dialog.open(DialogEditAbsenceComponent, {
      width: '600px',
      disableClose: true,
      data: {
        created: absence.created,
        schoolSubject: absence.school_subject.name,
        schoolSubjectId: absence.school_subject.id,
        professor: absence.professor.first_name + ' ' + absence.professor.last_name,
        professorId: absence.professor.id,
        student: absence.student.first_name + ' ' + absence.student.last_name,
        studentId: absence.student.id,
        absenceId: absence.id,
        isJustified: absence.is_justified,
        comment: absence.comment,
        title: absence.title,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.edited) {
        this.getAllAbsences();
      }
    });
  }

  displayedColumns: string[] = ['schoolSubject', 'professor', 'student', 'isJustified', 'showDetails'];

}
