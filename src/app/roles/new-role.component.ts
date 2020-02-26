import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogNewRole {
  roleName: string;
}

@Component({
  selector: 'app-roles',
  templateUrl: './new-role.component.html',
  styleUrls: ['./new-role.component.scss']
})
export class DialogNewRoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogNewRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogNewRole, private snackBar: MatSnackBar, private schoolService: SchoolService) {
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'added': false});
  }

  addNewRole(roleName) {
    this.data.roleName = roleName;
    this.schoolService.addNewRole(this.data.roleName).subscribe((data: any) => {
      this.snackBar.open('Role is successfully added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': true});
    }, err => {
      this.snackBar.open('Role is not added!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'added': false});
    });
  }

}
