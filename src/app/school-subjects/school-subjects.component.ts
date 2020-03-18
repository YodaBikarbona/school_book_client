import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/school.services';
import {DialogEditSchoolSubjectComponent} from './edit-school-subject.component';
import {DialogNewSchoolSubjectComponent} from './new-school-subject.component';
import {DialogDeleteSchoolSubjectComponent} from './delete-school-subject.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-school-subjects',
  templateUrl: './school-subjects.component.html',
  styleUrls: ['./school-subjects.component.scss']
})
export class SchoolSubjectsComponent implements OnInit {

  schoolSubjectsLimit = 5;
  schoolSubjectsOffset = 0;
  schoolSubjects: any;
  schoolSubjectsLength = 0;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllSchoolSubjects();
  }

  getAllSchoolSubjects() {
    this.schoolService.getAllSchoolSubjects(this.schoolSubjectsLimit, this.schoolSubjectsOffset).subscribe((data: any) => {
      this.schoolSubjects = data.results;
      if (this.schoolSubjects && this.schoolSubjects.length > 0) {
        for (let i = 0; i < this.schoolSubjects.length; i++) {
          const created = this.schoolSubjects[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.schoolSubjects[i].created = date + ' ' + time;
        }
        this.schoolSubjectsLength = this.schoolSubjects[0].school_subjects_number;
      } else {
        this.schoolSubjectsLength = 0;
      }
    }, err => {

    });
  }

  openDialogEditSchoolSubject(request): void {
    const dialogRef = this.dialog.open(DialogEditSchoolSubjectComponent, {
      width: '300px',
      disableClose: true,
      data: {schoolSubjectId: request.id, schoolSubjectName: request.name, isActive: request.is_active}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.edited === true) {
        this.getAllSchoolSubjects();
      }
    });
  }

  openDialogNewSchoolSubject(request): void {
    const dialogRef = this.dialog.open(DialogNewSchoolSubjectComponent, {
      width: '300px',
      disableClose: true,
      data: {schoolSubjectName: '', isActive: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.getAllSchoolSubjects();
      }
    });
  }

  openDialogDeleteSchoolSubject(request): void {
    const dialogRef = this.dialog.open(DialogDeleteSchoolSubjectComponent, {
      width: '300px',
      disableClose: true,
      data: {schoolSubjectId: request.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted === true) {
        this.getAllSchoolSubjects();
      }
    });
  }

  changeOffsetLimit(event) {
    this.schoolSubjectsLimit = event.pageSize;
    this.schoolSubjectsOffset = event.pageIndex;
    this.getAllSchoolSubjects();
  }

  displayedColumns: string[] = ['name', 'isActive', 'deleteSchoolSubject', 'editSchoolSubject'];
}
