import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DialogNewRole} from '../roles/new-role.component';
import {SchoolService} from '../services/school.services';
import {UserService} from '../services/user.service';

export interface DialogAddNewMember {
  schoolClassId: number;
  isActive: boolean;
  userId: number;
  roleName: string;
}

@Component({
  selector: 'app-school-class-members',
  templateUrl: './new-school-class-member.component.html',
  styleUrls: ['./new-school-class-member.component.scss']
})
export class DialogNewSchoolClassMemberComponent implements OnInit {

  users = [];
  allUsers: any;

  constructor(public dialogRef: MatDialogRef<DialogNewSchoolClassMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogAddNewMember, private schoolService: SchoolService, private userService: UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.get_all_users();
  }

  onChangeRole(event) {
    this.data.roleName = event.value;
    this.users = [];
    if (event.value === 'professor') {
      for (let i = 0; i < this.allUsers.length; i++) {
          if (this.allUsers[i].role.name === 'Professor') {
            this.users.push(this.allUsers[i]);
          }
        }
    } else {
      for (let i = 0; i < this.allUsers.length; i++) {
          if (this.allUsers[i].role.name === 'Student') {
            this.users.push(this.allUsers[i]);
          }
        }
    }
  }

  onChangeUser(event) {
    this.data.userId = event.value;
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  get_all_users() {
    this.userService.getAllUsers(0, 0, 1, 0, 0, '', '').subscribe((data: any) => {
      this.allUsers = data.results;
      for (let i = 0; i < this.allUsers.length; i++) {
        console.log(this.allUsers[i].role.name)
          if (this.allUsers[i].role.name === 'Student' || this.allUsers[i].role.name === 'Professor') {
            this.users.push(this.allUsers[i]);
          }
        }

    }, err => {
    });

  }

  addMember() {
    this.schoolService.addNewMemberToSchoolClass(this.data.isActive, this.data.roleName, this.data.schoolClassId, this.data.userId).subscribe((data: any) => {
      this.snackBar.open('Member is successfully added to this school class!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('Member is not added to this school class!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }
}
