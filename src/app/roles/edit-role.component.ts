import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {DialogNewRole} from './new-role.component';
import {SchoolService} from '../services/school.services';

export interface DialogEditRole {
  id: number;
  roleName: string;
}

@Component({
  selector: 'app-roles',
  templateUrl: './edit-role.component.html',
  styleUrls: ['./edit-role.component.scss']
})
export class DialogEditRoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogEditRole, private snackBar: MatSnackBar, private schoolService: SchoolService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  editRole(data) {
    this.schoolService.editRole(data.id, data.roleName).subscribe((data: any) => {
      this.snackBar.open('Role is successfully edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': true});
    }, err => {
      this.snackBar.open('Role is not edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': false});
    });
  }

}
