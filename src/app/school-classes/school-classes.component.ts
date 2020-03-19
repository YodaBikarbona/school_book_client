import { Component, OnInit } from '@angular/core';
import {SchoolService} from '../services/school.services';
import {MatDialog} from '@angular/material';
import {DialogDeleteSchoolClassComponent} from './delete-school-class.component';
import {DialogNewSchoolClassComponent} from './new-school-class.component';
import {DialogEditSchoolClassComponent} from './edit-school-class.component';

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

  openDialogDeleteSchoolClass(request): void {
    const dialogRef = this.dialog.open(DialogDeleteSchoolClassComponent, {
      width: '300px',
      disableClose: true,
      data: {schoolClassId: request.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted === true) {
        this.getAllSchoolClasses();
      }
    });
  }

  openDialogEditSchoolClass(request): void {
    const dialogRef = this.dialog.open(DialogEditSchoolClassComponent, {
      width: '600px',
      disableClose: true,
      data: {schoolClassId: request.id, schoolClassName: request.name, isActive: request.is_active}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.edited === true) {
        this.getAllSchoolClasses();
      }
    });
  }

  openDialogNewSchoolClass(request): void {
    const dialogRef = this.dialog.open(DialogNewSchoolClassComponent, {
      width: '600px',
      disableClose: true,
      data: {schoolClassName: '', schoolYear: '', isActive: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.getAllSchoolClasses();
      }
    });
  }

  changeOffsetLimit(event) {
    this.schoolClassesLimit = event.pageSize;
    this.schoolClassesOffset = event.pageIndex;
    this.getAllSchoolClasses();
  }

  displayedColumns: string[] = ['name', 'school_year', 'isActive', 'deleteSchoolSubject', 'editSchoolSubject'];
}
