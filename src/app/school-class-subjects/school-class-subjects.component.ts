import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/school.services';
import {MatDialog} from '@angular/material';
import {DialogDeleteSchoolClassMemberComponent} from '../school-class-members/delete-school-class-member.component';
import {DialogDeleteSchoolClassSubjectComponent} from './delete-school-class-subject.component';
import {DialogEditSchoolClassSubjectComponent} from './edit-school-class-subject.component';
import {DialogNewSchoolClassSubjectComponent} from './new-school-class-subject.component';

@Component({
  selector: 'app-school-class-subjects',
  templateUrl: './school-class-subjects.component.html',
  styleUrls: ['./school-class-subjects.component.scss']
})
export class SchoolClassSubjectsComponent implements OnInit {

  schoolClasses: any;
  schoolClassChosen = false;
  schoolClassId = 0;
  schoolSubjects: any;
  schoolSubjectsLimit = 5;
  schoolSubjectsOffset = 0;
  schoolSubjectsLength = 0;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllSchoolClasses();
  }

  getAllSchoolClasses() {
    this.schoolService.getAllSchoolClasses(0, 0).subscribe((data: any) => {
      this.schoolClasses = data.results;
      if (this.schoolClasses && this.schoolClasses.length > 0) {
        for (let i = 0; i < this.schoolClasses.length; i++) {
          const created = this.schoolClasses[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.schoolClasses[i].created = date + ' ' + time;
        }
      }
    }, err => {

    });
  }

  getAllSchoolClassSubjects() {
    this.schoolService.getAllSchoolClassSubjects(this.schoolClassId, this.schoolSubjectsLimit, this.schoolSubjectsOffset).subscribe((data: any) => {
      this.schoolSubjects = data.results;
      if (this.schoolSubjects && this.schoolSubjects.length > 0) {
        this.schoolSubjectsLength = this.schoolSubjects[0].school_class_subjects_number;
      } else {
        this.schoolSubjectsLength = 0;
      }
    }, err => {

    });
  }

  onChangeSchoolClass(event) {
    this.schoolClassChosen = true;
    this.schoolClassId = event.value;
    this.getAllSchoolClassSubjects();
  }

  changeOffsetLimit(event) {
    this.schoolSubjectsLimit = event.pageSize;
    this.schoolSubjectsOffset = event.pageIndex;
    this.getAllSchoolClassSubjects();
  }

  openDialogDeleteSubject(data): void {
    const dialogRef = this.dialog.open(DialogDeleteSchoolClassSubjectComponent, {
      width: '300px',
      disableClose: true,
      data: {
        schoolClassSubjectId: data.id,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted === true) {
        this.getAllSchoolClassSubjects();
      }
    });
  }

  openDialogEditSubject(data): void {
    const dialogRef = this.dialog.open(DialogEditSchoolClassSubjectComponent, {
      width: '600px',
      disableClose: true,
      data: {
        schoolClassSubjectId: data.id,
        isActive: data.is_active,
        subjectName: data.school_subject.name,
        professorFirstName: data.professor.first_name,
        professorLastName: data.professor.last_name,
        professorEmail: data.professor.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.edited === true) {
        this.getAllSchoolClassSubjects();
      }
    });
  }

  openDialogAddSubject(): void {
    const dialogRef = this.dialog.open(DialogNewSchoolClassSubjectComponent, {
      width: '600px',
      disableClose: true,
      data: {
        isActive: false,
        userId: null,
        subjectId: null,
        schoolClassId: this.schoolClassId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.getAllSchoolClassSubjects();
      }
    });
  }

  displayedColumns: string[] = ['name', 'professor', 'email', 'isActive', 'deleteSubject', 'showDetails'];

}
