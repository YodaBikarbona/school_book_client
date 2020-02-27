import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {SchoolService} from '../services/school.services';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {

  children: any;
  schoolSubjects: any;
  isChildChosen = false;
  isSchoolSubjectChosen = false;
  childId: number;
  schoolSubjectId = 0;

  constructor(private userService: UserService, private schoolService: SchoolService) { }

  ngOnInit() {
    this.userService.getChildrenByParentId().subscribe((data: any) => {
      this.children = data.results;
      if (this.children) {
        this.schoolService.getAllSchoolSubjects(0, 0).subscribe((data: any) => {
          this.schoolSubjects = data.results;
        }, err => {

        });
      }
    }, err => {
    });
  }

  onChangeChild(event) {
    this.isChildChosen = true;
    this.childId = event.value;
  }

  onChangeSchoolSubject(event) {
    if (event.value === 'null') {
      this.schoolSubjectId = 0;
    }
    else {
      this.schoolSubjectId = event.value;
    }
  }

}
