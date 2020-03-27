import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit, OnDestroy, Injectable} from '@angular/core';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {MatSidenavModule} from '@angular/material';
import {NavItem} from './nav-item';
import {NavService} from './nav.service';
import {AuthenticationService} from '../services/authentication.service';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private autenticationService: AuthenticationService, public router: Router, public userService: UserService, private spinner: NgxSpinnerService) {
  }

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnDestroy(): void {
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

  closeMenu(menuDisplayName: string, drawer) {
    if (menuDisplayName !== 'Admin' && window.innerWidth < 768) {
      drawer.close();
      const element = document.getElementById('menuButton');
      element.classList.remove('cdk-focused');
      element.classList.remove('cdk-program-focused');
    }
  }

  @ViewChild('appDrawer') appDrawer: ElementRef;
  navItems: NavItem[] = [
    {
      displayName: 'Profile',
      iconName: 'account_circle',
      route: 'profile',
    },
    {
      displayName: 'Join to class room',
      iconName: 'meeting_room',
      route: 'class_room',
    },
    {
      displayName: 'Options',
      disabled: true,
      iconName: 'settings',
      route: 'settings',
    },
  ];

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}

@Injectable({
  providedIn: 'root'
})
export class DashboardGuard implements CanActivate {

  constructor(private autenticationService: AuthenticationService, public router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.autenticationService.getToken()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
