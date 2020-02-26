import {Component, OnDestroy, OnInit} from '@angular/core';
import {SchoolService} from '../services/school.services';
import {UserService} from '../services/user.service';
import {FormControl} from '@angular/forms';
import {Subscription, zip} from 'rxjs';
import {debounceTime, flatMap, map} from 'rxjs/operators';
import {DialogNewUserComponent} from './new-user.component';
import {MatDialog} from '@angular/material';
import {DialogEditUserComponent} from './edit-user.component';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {

  genders: any;
  roles: any;
  users: any;
  isActive = -1;
  isDelete = -1;
  genderId = 0;
  roleId = 0;
  usersLimit = 5;
  usersOffset = 0;
  usersLength = 0;
  birthDate = '';
  birthDateSelect = undefined;
  searchField = new FormControl('');
  subSubscription: Subscription;
  search = '';

  constructor(private schoolService: SchoolService, private userService: UserService, private dialog: MatDialog, public router: Router, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.schoolService.getAllGenders().subscribe((data: any) => {
      this.genders = data.results;
    }, err => {

    });
    this.schoolService.getAllRoles(0, 0).subscribe((data: any) => {
      this.roles = data.results;
    }, err => {

    });

    let userList = (searchValues: string) => this.userService.getAllUsers(this.usersLimit, this.usersOffset, this.isActive, this.isDelete, this.roleId, this.genderId, this.birthDate, searchValues);

    userList('').subscribe((data: any) => {
      this.users = data.results;
      if (this.users && this.users.length > 0) {
        this.usersLength = this.users[0].users_number;
      } else {
        this.usersLength = 0;
      }
    });

    let userSearch = (searchValues: string) => zip(userList(searchValues));

    this.subSubscription = this.searchField.valueChanges.pipe(debounceTime(500), flatMap((value) => userSearch(value)
    ))
      .subscribe((data: any) => {
        this.users = data[0].results;
        if (this.users && this.users.length > 0) {
          this.usersLength = this.users[0].users_number;
        } else {
          this.usersLength = 0;
        }
      });
  }

  ngOnDestroy() {
    this.subSubscription.unsubscribe();
  }

  get_all_users() {
    this.userService.getAllUsers(this.usersLimit, this.usersOffset, this.isActive, this.isDelete, this.roleId, this.genderId, this.birthDate, this.searchField.value).subscribe((data: any) => {
      this.users = data.results;
      if (this.users && this.users.length > 0) {
        this.usersLength = this.users[0].users_number;
      } else {
        this.usersLength = 0;
      }
    }, err => {
    });

  }

  onChangeActivity(event) {
    this.isActive = event.value;
    this.get_all_users();
  }

  onChangeDeleteStatus(event) {
    this.isDelete = event.value;
    this.get_all_users();
  }

  onChangeRole(event) {
    if (event.value === 'null') {
      this.roleId = 0;
    } else {
      this.roleId = event.value;
    }
    this.get_all_users();
  }

  onChangeGender(event) {
    if (event.value === 'null') {
      this.genderId = 0;
    } else {
      this.genderId = event.value;
    }
    this.get_all_users();
  }

  clearFilters() {
    this.roleId = undefined;
    this.genderId = undefined;
    this.isActive = undefined;
    this.isDelete = undefined;
    this.birthDate = '';
    this.birthDateSelect = '';
    this.search = '';
    this.isActive = -1;
    this.isDelete = -1;
    this.roleId = 0;
    this.genderId = 0;
    this.get_all_users();

  }

  onChangeBirthDate(event) {
    const tempDateFrom = new Date(event.value);
    const dateString = tempDateFrom.getFullYear() + '-' + (tempDateFrom.getMonth() + 1) + '-' + tempDateFrom.getDate() + 'T' + tempDateFrom.getHours() + ':' + tempDateFrom.getMinutes() + ':' + tempDateFrom.getSeconds() + '.' + tempDateFrom.getMilliseconds();
    this.birthDate = dateString.split('T')[0];
    this.get_all_users();
  }

  changeOffsetLimit(event) {
    this.usersLimit = event.pageSize;
    this.usersOffset = event.pageIndex;
    this.get_all_users();
  }

  openDialogNewUser(): void {
    const dialogRef = this.dialog.open(DialogNewUserComponent, {
      width: '600px',
      disableClose: true,
      data: {
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        city: '',
        phone: '',
        is_active: false,
        birth_date: '',
        genderId: null,
        roleId: null,
        parent_mother: null,
        parent_father: null,
        roles: this.roles,
        genders: this.genders,
        password: ''
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.added === true) {
        this.get_all_users();
      }
    });
  }

  openDialogEditUser(data): void {
    const dialogRef = this.dialog.open(DialogEditUserComponent, {
      width: '600px',
      disableClose: true,
      data: {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        address: data.address,
        city: data.city,
        phone: data.phone,
        is_active: data.is_active,
        is_deleted: data.is_delete,
        birth_date: data.birth_date,
        genderId: data.gender.id,
        roleId: data.role.id,
        parent_mother: data.parent_mother.id ? data.parent_mother.id : null,
        parent_father: data.parent_father.id ? data.parent_father.id : null,
        roles: this.roles,
        genders: this.genders
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.edited === true || result.deleted === true || result.activated === true || result.deactivated === true || result.changed === true) {
        this.get_all_users();
      }
    });
  }

  logout() {
    this.spinner.show();
    localStorage.removeItem('auth-token');
    localStorage.removeItem('userRole');
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.router.navigate(['login']);
  }

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'role', 'gender', 'isActive', 'isDeleted', 'showDetails'];

}
