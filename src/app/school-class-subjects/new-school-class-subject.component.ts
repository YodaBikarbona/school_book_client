import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';
import {UserService} from '../services/user.service';

export interface DialogAddNewSchoolClassSubject {
  isActive: boolean;
  userId: number;
  subjectId: number;
  schoolClassId: number;
}

@Component({
  selector: 'app-new-school-class-subject',
  templateUrl: './new-school-class-subject.component.html',
  styleUrls: ['./new-school-class-subject.component.scss']
})
export class DialogNewSchoolClassSubjectComponent implements OnInit {

  users: any;
  schoolSubjects: any;

  constructor(public dialogRef: MatDialogRef<DialogNewSchoolClassSubjectComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogAddNewSchoolClassSubject, private schoolService: SchoolService, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllSchoolClassMembers();
    this.getAllSchoolSubjects();
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  getAllSchoolClassMembers() {
    this.schoolService.getAllSchoolClassMembers(this.data.schoolClassId, 0, 0).subscribe((data: any) => {
      this.users = data.results;
      const tempUsers = [];
      for (let i = 0; i < this.users.length; i++) {
        if (this.users[i].professor) {
          tempUsers.push(this.users[i]);
        }
        }
      this.users = tempUsers;
    }, err => {

    });
  }

  getAllSchoolSubjects() {
    this.schoolService.getAllSchoolSubjects(0, 0).subscribe((data: any) => {
      this.schoolSubjects = data.results;
    }, err => {
    });
  }

  addNewSchoolClassSubject() {
    this.schoolService.addNewSchoolSubjectToSchoolClass(this.data.isActive, this.data.userId, this.data.subjectId, this.data.schoolClassId).subscribe((data: any) => {
      this.snackBar.open('School subject is successfully added to this school class!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('School subject is not added to this school class!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }

}
