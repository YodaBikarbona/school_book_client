import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/school.services';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-school-classes',
  templateUrl: './school-classes.component.html',
  styleUrls: ['./school-classes.component.scss']
})
export class SchoolClassesComponent implements OnInit {

  schoolClassesLimit = 5;
  schoolClassesOffset = 0;
  schoolClasses: any;
  schoolClassesLength = 0;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) { }

  ngOnInit() {
    this.getAllSchoolClasses();
  }

  getAllSchoolClasses() {
    this.schoolService.getAllSchoolClasses(this.schoolClassesLimit, this.schoolClassesOffset).subscribe((data: any) => {
      this.schoolClasses = data.results;
      console.log(this.schoolClasses)
      if (this.schoolClasses && this.schoolClasses.length > 0) {
        for (let i = 0; i < this.schoolClasses.length; i++) {
          const created = this.schoolClasses[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.schoolClasses[i].created = date + ' ' + time;
        }
        this.schoolClassesLength = this.schoolClasses[0].school_classes_number;
      } else {
        this.schoolClassesLength = 0;
      }
    }, err => {

    });
  }

  displayedColumns: string[] = ['name', 'school_year', 'isActive', 'editSchoolSubject'];
}
