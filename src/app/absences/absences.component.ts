import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/user.service';
import {SchoolService} from '../services/school.services';

@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.scss']
})
export class AbsencesComponent implements OnInit {

  absences: any;
  children: any;
  schoolSubjects: any;
  schoolClasses: any;
  grades: any;
  isChildChosen = false;
  isSchoolSubjectChosen = false;
  isJustified = 'null';
  childId: number;
  schoolSubjectId: 0;
  schoolClassId: 0;
  isSchoolClassChosen = false;
  justifiedAbsences = 0;
  unjustifiedAbsences = 0;
  absenceLength = 0;

  constructor(private userService: UserService, private schoolService: SchoolService) {
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
    }, err => {
    });
    this.schoolClassId = 0;
    this.schoolSubjectId = 0;
    this.isJustified = 'null';
    this.getAllAbsences();
  }

  getAllAbsences() {
    this.schoolService.getAllAbsences(this.schoolClassId, this.childId, this.schoolSubjectId, this.isJustified).subscribe((data: any) => {
      this.absences = data.results;
      if (this.absences !== undefined) {
        for (let i = 0; i < this.absences.length; i++) {
          const created = this.absences[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.absences[i].created = date + ' ' + time;
        }
        this.absenceLength = this.absences.length;
      }
    }, err => {

    });
    this.schoolService.getAllAbsencesNumber(this.schoolClassId, this.childId, this.schoolSubjectId).subscribe((data: any) => {
      this.justifiedAbsences = data.justified_absences;
      this.unjustifiedAbsences = data.unjustified_absences;
    }, err => {

    });
  }

  onChangeSchoolClass(event) {
    this.isSchoolClassChosen = true;
    this.schoolClassId = event.value;
    this.schoolService.getAllSchoolClassSubjects(this.schoolClassId, 0, 0).subscribe((data: any) => {
      this.schoolSubjects = data.results;
    }, err => {
    });
    this.getAllAbsences();
  }

  onChangeSchoolSubject(event) {
    this.isSchoolSubjectChosen = true;
    if (event.value !== 'null') {
      this.schoolSubjectId = event.value;
    } else {
      this.schoolSubjectId = 0;
    }
    this.getAllAbsences();
  }

  onChangeJustified(event) {
    this.isJustified = event.value;
    this.getAllAbsences();
  }

}
