import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogDeleteRole {
  roleId: number;
}

@Component({
  selector: 'app-roles',
  templateUrl: './delete-role.component.html',
  styleUrls: ['./delete-role.component.scss']
})
export class DialogDeleteRoleComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDeleteRole, private snackBar: MatSnackBar, private schoolService: SchoolService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'deleted': false});
  }

  deleteRole() {
    this.schoolService.deleteRole(this.data.roleId).subscribe((data: any) => {
      this.snackBar.open('Role is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': true});
    }, err => {
      this.snackBar.open('Role is not successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': false});
    });
  }
}
