import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';
import {DialogChangePasswordComponent} from './change-password.component';
import {DialogDeleteUserComponent} from './delete-user.component';

export interface DialogEditUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  city: string;
  phone: string;
  is_active: boolean;
  newsletter: boolean;
  birth_date: string;
  genderId: number;
  roleId: number;
  parent_mother: number;
  parent_father: number;
  roles: any;
  genders: any;
  birthDateSelect;
}

@Component({
  selector: 'app-users',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class DialogEditUserComponent implements OnInit {

  users: any;
  usersLimit = 0;
  usersOffset = 0;
  parent = false;
  student = false;
  chosenParent = false;
  parentRoleId = 3;

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogEditUser, private userService: UserService, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.data.birthDateSelect = this.data.birth_date;
    if (this.data.roleId === 4) {
      this.student = true;
    }
    this.get_all_users();
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  openDialogDeleteUser(data): void {
    const dialogRef = this.dialog.open(DialogDeleteUserComponent, {
      width: '300px',
      disableClose: true,
      data: {id: data.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted === true) {
        this.snackBar.open('User is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
        this.dialogRef.close({'deleted': true});
      }
    });
  }

  editUser(data) {
    this.userService.editUser(data.id, data.first_name, data.last_name, data.email, data.address, data.city, data.phone, data.is_active, data.newsletter, data.birth_date, data.genderId, data.roleId, data.parent_mother, data.parent_father).subscribe((data: any) => {
      this.snackBar.open('User is successfully edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': true});
    }, err => {
      this.snackBar.open('User is not edited!', null, {duration: 4000, verticalPosition: 'top'});
      // this.dialogRef.close({'edited': false});
    });
  }

  activateUser(data) {
    this.userService.activateUserByUserId(data.id, true).subscribe((data: any) => {
      this.snackBar.open('User is successfully activated!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'activated': true});
    }, err => {
      this.snackBar.open('User is not activated!', null, {duration: 4000, verticalPosition: 'top'});
    });
  }

  deactivateUser(data) {
    this.userService.deactivateUserByUserId(data.id, false).subscribe((data: any) => {
      this.snackBar.open('User is successfully deactivated!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deactivated': true});
    }, err => {
      this.snackBar.open('User is not deactivated!', null, {duration: 4000, verticalPosition: 'top'});
    });
  }

  onChangeRole(event) {
    this.data.roleId = event.value;
    if (event.value === 3) {
      this.parent = true;
      this.student = false;
      this.get_all_users();
    } else if (event.value === 4) {
      this.parent = false;
      this.student = true;
      this.data.email = '';
      this.data.phone = '';
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

  openDialogChangePassword(data): void {
    const dialogRef = this.dialog.open(DialogChangePasswordComponent, {
      width: '600px',
      disableClose: true,
      data: {id: data.id, password: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.changed === true) {
        this.snackBar.open('Password is successfully changed!', null, {duration: 4000, verticalPosition: 'top'});
        this.dialogRef.close({'changed': true});
      }
    });
  }
}
