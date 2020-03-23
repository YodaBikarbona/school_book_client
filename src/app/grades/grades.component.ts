import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {SchoolService} from '../services/school.services';
import {DialogGradeComponent} from './grade.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.scss']
})
export class GradesComponent implements OnInit {

  children: any;
  schoolSubjects: any;
  schoolClasses: any;
  grades: any;
  isChildChosen = false;
  isSchoolClassChosen = false;
  childId: number;
  schoolSubjectId: number;
  schoolClassId: number;
  isSchoolSubjectChosen = false;
  gradesLimit = 0;
  gradesOffset = 0;
  gradesLength = 0;

  constructor(private userService: UserService, private schoolService: SchoolService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.userService.getChildrenByParentId().subscribe((data: any) => {
      this.children = data.results;
    }, err => {
    });
  }

  onChangeChild(event) {
    this.isChildChosen = true;
    this.childId = event.value;
    this.schoolService.getAllSchoolClassesByStudentId(0, 0, this.childId).subscribe((data: any) => {
      this.schoolClasses = data.results;
    });
    this.schoolClassId = undefined;
  }

  onChangeSchoolClass(event) {
    this.isSchoolClassChosen = true;
    this.schoolClassId = event.value;
    this.schoolService.getAllSchoolClassSubjects(this.schoolClassId, 0, 0).subscribe((data: any) => {
      this.schoolSubjects = data.results;
    }, err => {

    });
    this.getAllGrades();
  }

  onChangeSchoolSubject(event) {
    this.isSchoolSubjectChosen = true;
    if (event.value !== 'null') {
      this.schoolSubjectId = event.value;
    } else {
      this.schoolSubjectId = 0;
    }
    this.getAllGrades();
  }

  getAllGrades() {
    this.schoolService.getAllGrades(this.schoolClassId, this.childId, this.schoolSubjectId).subscribe((data: any) => {
        this.grades = data.results;
        if (this.grades && this.grades.length > 0) {
          for (let i = 0; i < this.grades.length; i++) {
            const created = this.grades[i].created.split('T');
            const date = created[0];
            const time = created[1].split('Z')[0];
            this.grades[i].created = date + ' ' + time;
          }
          this.gradesLength = this.grades.length;
        } else {
          this.gradesLength = 0;
        }
      }, err => {

      }
    );
  }

  openDialogShowGrade(grade: any): void {
    const newDate = new Date(grade.created);
    const dialogRef = this.dialog.open(DialogGradeComponent, {
      width: '500px',
      disableClose: true,
      data: {
        created: newDate,
        grade: grade.grade,
        gradeType: grade.grade_type,
        comment: grade.comment,
        professor: grade.professor.first_name + ' ' + grade.professor.last_name,
        student: grade.student.first_name + ' ' + grade.student.last_name,
        schoolSubject: grade.school_subject.name,
        schoolClass: grade.school_class.name
      }
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  changeOffsetLimit(event) {
    this.gradesLimit = event.pageSize;
    this.gradesOffset = event.pageIndex;
  }

  displayedColumns: string[] = ['school_subject', 'grade', 'date', 'comment', 'type', 'showDetails'];

}
