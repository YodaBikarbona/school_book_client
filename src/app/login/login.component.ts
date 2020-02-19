import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../services/authentication.service';
import {Router} from '@angular/router';
import {AuthenticationRequest} from '../model';
import {NgxSpinnerService} from 'ngx-spinner';
import {MatDialog, MatSnackBar} from '@angular/material';
import {DialogActivationComponent} from './activation.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  showPassword = false;
  authentcationRequest: AuthenticationRequest = null;
  currentEmail = '';
  currentPassword = '';
  constructor(public authService: AuthenticationService, public router: Router, private spinner: NgxSpinnerService, private snackBar: MatSnackBar, private dialog: MatDialog) { }

  ngOnInit() {
    if (localStorage.getItem('auth-token')) {
      if (localStorage.getItem('userRole') && localStorage.getItem('userRole') === 'Parent') {
        this.router.navigate(['parentDashboard']);
      }
      else if (localStorage.getItem('userRole') && localStorage.getItem('userRole') !== 'Administrator' && localStorage.getItem('userRole') !== 'Parent') {
        this.router.navigate(['dashboard']);
      }
      else if (localStorage.getItem('userRole') && localStorage.getItem('userRole') === 'Administrator') {
        this.router.navigate(['adminDashboard']);
      }
      else {
        this.router.navigate(['login']);
      }
    }
  }

  toogleShowPassword() {
    if (this.showPassword === false) {
      this.showPassword = true;
    }
    else {
      this.showPassword = false;
    }
  }

  login(email: string, password: string) {
    this.currentEmail = email;
    this.currentPassword = password;
    let request = new AuthenticationRequest(email, password);
    this.spinner.show();
    this.authService.authenticate(request).subscribe(
      res => {
        this.spinner.hide();
        console.log(res);
        if (localStorage.getItem('auth-token')) {
          if (localStorage.getItem('userRole') && localStorage.getItem('userRole') === 'Parent') {
            this.router.navigate(['parentDashboard']);
          }
          else if (localStorage.getItem('userRole') && localStorage.getItem('userRole') !== 'Administrator' && localStorage.getItem('userRole') !== 'Parent') {
            this.router.navigate(['dashboard']);
          }
          else if (localStorage.getItem('userRole') && localStorage.getItem('userRole') === 'Administrator') {
            this.router.navigate(['adminDashboard']);
          }
          else {
            this.router.navigate(['login']);
          }
        }
      }, err => {
        if (err.error.code === 403) {
          if (err.error.message === 'User is deactivated!') {
            this.openDialogActivation(request);
          }
          else {
            this.snackBar.open(err.error.message, null, {duration: 4000, verticalPosition: 'top'});
          }
        }
        else if (err.error.code === 400) {
          this.snackBar.open('All fields are required!', null, {duration: 4000, verticalPosition: 'top'});
        }
        else {
          this.snackBar.open('Something is wrong!', null, {duration: 4000, verticalPosition: 'top'});
        }
      }
    );
  }

  openDialogActivation(request): void {
    const dialogRef = this.dialog.open(DialogActivationComponent, {
      width: '300px',
      disableClose: true,
      data: {email: request.email, password: request.password, code: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.is_active === true) {
        this.login(this.currentEmail, this.currentPassword);
      }
    });
  }

}
