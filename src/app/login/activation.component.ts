import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';


export interface DialogActivation {
  email: string;
  password: string;
  code: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './activation.component.html',
  styleUrls: ['./activation.component.scss']
})
export class DialogActivationComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogActivationComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogActivation, private snackBar: MatSnackBar, private userService: UserService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'is_active': false});
  }

  activateUser() {
    this.userService.activateUser(this.data.email, this.data.code).subscribe(
      data => {
        this.dialogRef.close({'is_active': true});
      }, err => {
        if (err.error.code === 403) {
          this.snackBar.open(err.error.message, null, {duration: 4000, verticalPosition: 'top'});
        }
        else {
          this.snackBar.open('Something is wrong, an account cannot be activated!', null, {duration: 4000, verticalPosition: 'top'});
        }
      }
    );
  }

}
