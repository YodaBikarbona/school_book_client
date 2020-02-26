import {Component, OnInit} from '@angular/core';
import {SchoolService} from '../services/school.services';
import {DialogNewRoleComponent} from './new-role.component';
import {MatDialog} from '@angular/material';
import {DialogDeleteRoleComponent} from './delete-role.component';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  roles: any;
  rolesLength = 0;
  rolesLimit = 5;
  rolesOffset = 0;

  constructor(private schoolService: SchoolService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllRoles();
  }

  getAllRoles() {
    this.schoolService.getAllRoles(this.rolesLimit, this.rolesOffset).subscribe((data: any) => {
      this.roles = data.results;
      if (this.roles && this.roles.length > 0) {
        for (let i = 0; i < this.roles.length; i++) {
          const created = this.roles[i].created.split('T');
          const date = created[0];
          const time = created[1].split('Z')[0];
          this.roles[i].created = date + ' ' + time;
        }
        this.rolesLength = this.roles[0].roles_number;
      }
    }, err => {

    });
  }

  openDialogNewRole(): void {
    const dialogRef = this.dialog.open(DialogNewRoleComponent, {
      width: '300px',
      disableClose: true,
      data: {roleName: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.getAllRoles();
      }
    });
  }

  openDialogDeleteRole(request): void {
    const dialogRef = this.dialog.open(DialogDeleteRoleComponent, {
      width: '300px',
      disableClose: true,
      data: {roleId: request.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.deleted === true) {
        this.getAllRoles();
      }
    });
  }

  changeOffsetLimit(event) {
    this.rolesLimit = event.pageSize;
    this.rolesOffset = event.pageIndex;
    this.getAllRoles();
  }

  displayedColumns: string[] = ['created', 'name', 'deleteRole'];

}
