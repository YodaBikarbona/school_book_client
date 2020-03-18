import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';
import {UserService} from '../services/user.service';

export interface DialogEditMember {
  memberId: number;
  isActive: boolean;
  roleName: string;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
}

@Component({
  selector: 'app-edit-school-class-member',
  templateUrl: './edit-school-class-member.component.html',
  styleUrls: ['./edit-school-class-member.component.scss']
})
export class DialogEditSchoolClassMemberComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditSchoolClassMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogEditMember, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  activateOrDeactivate() {
    this.schoolService.activateOrDeactivateMember(this.data.memberId, this.data.isActive, this.data.roleName).subscribe((data: any) => {
      this.snackBar.open('Member is successfully edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': true});
    }, err => {
      this.snackBar.open('Member is not edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': false});
    });
  }

}
