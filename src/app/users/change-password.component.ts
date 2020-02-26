import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';

export interface DialogChangePassword {
  id: number;
  password: string;
}

@Component({
  selector: 'app-users',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class DialogChangePasswordComponent implements OnInit {

  showPassword = false;

  constructor(public dialogRef: MatDialogRef<DialogChangePasswordComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogChangePassword, private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  changePassword(data) {
    this.userService.adminChangeUserPassword(data.id, data.password).subscribe((data: any) => {
      this.snackBar.open('Password is successfully changed!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'changed': true});
    }, err => {
      this.snackBar.open('Password is not changed!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'changed': false});
    });
  }

  toogleShowPassword() {
    if (this.showPassword === false) {
      this.showPassword = true;
    } else {
      this.showPassword = false;
    }
  }

  onNoClick(): void {
    this.dialogRef.close({'changed': false});
  }

}
