import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../services/school.services';
import {MatDialog} from '@angular/material';
import {DialogNewSchoolClassMemberComponent} from './new-school-class-member.component';
import {DialogEditSchoolClassMemberComponent} from './edit-school-class-member.component';
import {DialogDeleteSchoolClassMemberComponent} from './delete-school-class-member.component';

@Component({
  selector: 'app-school-class-members',
  templateUrl: './school-class-members.component.html',
  styleUrls: ['./school-class-members.component.scss']
})
export class SchoolClassMembersComponent implements OnInit {

  schoolClasses: any;
  schoolClassChosen = false;
  schoolClassId = 0;
  users: any;
  usersLimit = 5;
  usersOffset = 0;
  usersLength = 0;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllSchoolClasses();
  }

  getAllSchoolClasses() {
    this.schoolService.getAllSchoolClasses(0, 0).subscribe((data: any) => {
      this.schoolClasses = data.results;
      if (this.schoolClasses && this.schoolClasses.length > 0) {
        for (let i = 0; i < this.schoolClasses.length; i++) {
          const created = this.schoolClasses[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.schoolClasses[i].created = date + ' ' + time;
        }
      }
    }, err => {

    });
  }

  getAllSchoolClassMembers() {
    this.schoolService.getAllSchoolClassMembers(this.schoolClassId, this.usersLimit, this.usersOffset).subscribe((data: any) => {
      this.users = data.results;
      if (this.users && this.users.length > 0) {
        this.usersLength = this.users[0].users_number;
      } else {
        this.usersLength = 0;
      }
    }, err => {

    });
  }

  onChangeSchoolClass(event) {
    this.schoolClassChosen = true;
    this.schoolClassId = event.value;
    this.getAllSchoolClassMembers();
  }

  changeOffsetLimit(event) {
    this.usersLimit = event.pageSize;
    this.usersOffset = event.pageIndex;
    this.getAllSchoolClassMembers();
  }

  openDialogNewMember(): void {
    const dialogRef = this.dialog.open(DialogNewSchoolClassMemberComponent, {
      width: '600px',
      disableClose: true,
      data: {schoolClassId: this.schoolClassId, isActive: false, userId: null, roleName: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.getAllSchoolClassMembers();
      }
    });
  }

  openDialogEditMember(data): void {
    const dialogRef = this.dialog.open(DialogEditSchoolClassMemberComponent, {
      width: '600px',
      disableClose: true,
      data: {
        memberId: data.id,
        isActive: data.is_active,
        roleName: data.professor ? data.professor.role.name : data.student.role.name,
        userFirstName: data.professor ? data.professor.first_name : data.student.first_name,
        userLastName: data.professor ? data.professor.last_name : data.student.last_name,
        userEmail: data.professor ? data.professor.email : data.student.email
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.edited === true) {
        this.getAllSchoolClassMembers();
      }
    });
  }

  openDialogDeleteMember(data): void {
    const dialogRef = this.dialog.open(DialogDeleteSchoolClassMemberComponent, {
      width: '300px',
      disableClose: true,
      data: {
        memberId: data.id,
        roleName: data.professor ? data.professor.role.name : data.student.role.name,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted === true) {
        this.getAllSchoolClassMembers();
      }
    });
  }

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'role', 'gender', 'isActive', 'deleteMember', 'showDetails'];

}
