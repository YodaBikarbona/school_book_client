import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {SchoolService} from '../services/school.services';

export interface DialogEditSchoolClass {
  schoolClassId: number;
  schoolClassName: string;
  isActive: boolean;
}

@Component({
  selector: 'app-edit-school-class',
  templateUrl: './edit-school-class.component.html',
  styleUrls: ['./edit-school-class.component.scss']
})
export class DialogEditSchoolClassComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogEditSchoolClassComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogEditSchoolClass, private schoolService: SchoolService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close({'edited': false});
  }

  editNewSchoolClass() {
    this.schoolService.editSchoolClass(this.data.schoolClassId, this.data.schoolClassName, this.data.isActive).subscribe((data: any) => {
      this.snackBar.open('School class is successfully edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': true});
    }, err => {
      this.snackBar.open('School class is not edited!', null, {duration: 4000, verticalPosition: 'top'});
      this.dialogRef.close({'edited': false});
    });
  }

}
