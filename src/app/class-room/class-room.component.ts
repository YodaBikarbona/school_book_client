import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/school.services';
import {DialogNewGradeComponent} from './new-grade.component';
import {MatDialog} from '@angular/material';

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
}
