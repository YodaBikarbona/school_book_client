import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';
import {typeIsOrHasBaseType} from 'tslint/lib/language/typeUtils';

export interface DialogNewUser {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  is_active: boolean;
  birth_date: string;
  genderId: number;
  roleId: number;
  parent_mother: number;
  parent_father: number;
  password: string;
  roles: any;
  genders: any;
  birthDateSelect;
}

@Component({
  selector: 'app-users',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class DialogNewUserComponent implements OnInit {

  users: any;
  usersLimit = 0;
  usersOffset = 0;
  parent = false;
  student = false;
  chosenParent = false;
  showPassword = false;
  parentRoleId = 3;

  constructor(public dialogRef: MatDialogRef<DialogNewUserComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogNewUser, private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.data.birthDateSelect = undefined;
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  addNewUser(data: any) {
    this.userService.addNewUser(data.first_name, data.last_name, data.email, data.address, data.city, data.phone, data.is_active, data.birth_date, data.genderId, data.roleId, data.parent_mother, data.parent_father, data.password).subscribe((data: any) => {
      this.snackBar.open('User is successfully added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('User is not added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }

  onChangeRole(event) {
    this.data.roleId = event.value;
    if (event.value === 3) {
      this.parent = true;
      this.student = false;
    } else if (event.value === 4) {
      this.parent = false;
      this.student = true;
      this.data.password = '';
      this.data.email = '';
      this.data.phone = '';
      this.get_all_users();
    } else {
      this.parent = false;
      this.users = [];
      this.data.parent_father = null;
      this.data.parent_mother = null;
      this.chosenParent = false;
      this.student = false;
    }
  }

  onChangeGender(event) {
    this.data.genderId = event.value;
  }

  onChangeMother(event) {
    this.data.parent_mother = event.value;
    this.chosenParent = true;
  }

  onChangeFather(event) {
    this.data.parent_father = event.value;
    this.chosenParent = true;
  }

  toogleShowPassword() {
    if (this.showPassword === false) {
      this.showPassword = true;
    } else {
      this.showPassword = false;
    }
  }

  get_all_users() {
    this.userService.getAllUsers(-1, this.usersOffset, 1, this.parentRoleId, 0, '', '').subscribe((data: any) => {
      this.users = data.results;
    }, err => {
    });

  }

  onChangeBirthDate(event) {
    const tempDateFrom = new Date(event.value);
    const dateString = tempDateFrom.getFullYear() + '-' + (tempDateFrom.getMonth() + 1) + '-' + tempDateFrom.getDate() + 'T' + tempDateFrom.getHours() + ':' + tempDateFrom.getMinutes() + ':' + tempDateFrom.getSeconds() + '.' + tempDateFrom.getMilliseconds();
    this.data.birth_date = dateString.split('T')[0];
  }
}
