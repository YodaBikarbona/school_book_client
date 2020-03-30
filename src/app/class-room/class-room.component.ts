import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/school.services';
import {DialogNewGradeComponent} from './new-grade.component';
import {MatDialog} from '@angular/material';
import {DialogGradeInfoComponent} from './grade-info.component';
import {DialogAbsencesInfoComponent} from './absences-info.component';
import {DialogNewAbsenceComponent} from './new-absence.component';

@Component({
  selector: 'app-class-room',
  templateUrl: './class-room.component.html',
  styleUrls: ['./class-room.component.scss']
})
export class ClassRoomComponent implements OnInit {

  schoolClasses: any;
  classRoomId = 0;
  classRoomInfo: any;
  index = 0;
  maxIndex = 0;
  studentInfo: any;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.schoolService.getSchoolClassesByProfessor().subscribe((data: any) => {
      this.schoolClasses = data.results;
      }, err => {

    });
  }

  joinClassRoom(classRoomId: number) {
    this.classRoomId = classRoomId;
    this.schoolClassInformation();

  }

  schoolClassInformation() {
    this.schoolService.getSchoolClassInformation(this.classRoomId).subscribe((data: any) => {
      this.classRoomInfo = data.results;
      if (this.classRoomInfo && this.classRoomInfo.length > 0) {
        this.studentInfo = this.classRoomInfo[this.index];
        this.maxIndex = this.classRoomInfo.length - 1;
        for (let i = 0; i < this.studentInfo.school_subjects.length; i++) {
          this.studentInfo.school_subjects[i].school_subject.grades = this.studentInfo.school_subjects[i].school_subject.grades.toString()
        }
      } else {
        this.studentInfo = undefined;
      }
    }, err => {

    });
  }

  nextStudent() {
    this.index += 1;
    this.studentInfo = this.classRoomInfo[this.index];
  }

  previousStudent() {
    this.index -= 1;
    this.studentInfo = this.classRoomInfo[this.index];
  }

  openDialogNewGrade(classRoomId, studentInfo, subject): void {
    const dialogRef = this.dialog.open(DialogNewGradeComponent, {
      width: '600px',
      disableClose: true,
      data: {
        grade: null,
        gradeType: '',
        comment: '',
        studentId: studentInfo.id,
        schoolSubjectId: subject.id,
        schoolClassId: classRoomId,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.schoolClassInformation();
      }
    });
  }

  openDialogAbsences(classRoomId, studentInfo): void {
    const dialogRef = this.dialog.open(DialogAbsencesInfoComponent, {
      width: '600px',
      disableClose: true,
      data: {
        schoolClassId: classRoomId,
        studentId: studentInfo.id,
        absences: null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogNewAbsence(classRoomId, studentInfo): void {
    const dialogRef = this.dialog.open(DialogNewAbsenceComponent, {
      width: '600px',
      disableClose: true,
      data: {
        schoolClassId: classRoomId,
        studentId: studentInfo.id,
        comment: '',
        title: '',
        isJustified: false,
        schoolSubjects: null,
        schoolSubjectId: null,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  openDialogGradeInformation(grades_info): void {
    let modalGradeInfo: any;
    modalGradeInfo = JSON.parse(JSON.stringify(grades_info));
    for (let i = 0; i < modalGradeInfo.length; i++) {
      const created = modalGradeInfo[i].created.split('T');
      const date = created[0];
      const time = created[1].split('Z')[0];
      modalGradeInfo[i].created = date + ' ' + time;
    }
    const dialogRef = this.dialog.open(DialogGradeInfoComponent, {
      width: '600px',
      disableClose: true,
      data: {
        grades: modalGradeInfo,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      modalGradeInfo = null;
    });
  }
}
