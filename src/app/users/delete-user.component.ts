import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {UserService} from '../services/user.service';

export interface DialogDeleteUser {
  id: number;
}

@Component({
  selector: 'app-users',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DialogDeleteUserComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteUserComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDeleteUser, private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'deleted': false});
  }

  deleteUser() {
    this.userService.deleteUser(this.data.id).subscribe((data: any) => {
      this.snackBar.open('User is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': true});
    }, err => {
      this.snackBar.open('User is not deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': false});
    });
  }

}
