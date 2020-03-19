import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogDeleteSchoolClassMember {
  memberId: number;
  roleName: string;
}

@Component({
  selector: 'app-delete-school-class-member',
  templateUrl: './delete-school-class-member.component.html',
  styleUrls: ['./delete-school-class-member.component.scss']
})
export class DialogDeleteSchoolClassMemberComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteSchoolClassMemberComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogDeleteSchoolClassMember, private snackBar: MatSnackBar, private schoolService: SchoolService) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'deleted': false});
  }

  deleteMember() {
    this.schoolService.deleteMember(this.data.memberId, this.data.roleName).subscribe((data: any) => {
      this.snackBar.open('Member is successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': true});
    }, err => {
      this.snackBar.open('Member is not successfully deleted!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'deleted': false});
    });
  }

}
