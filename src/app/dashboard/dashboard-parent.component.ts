import {Component, ViewChild, ElementRef, ViewEncapsulation, AfterViewInit, OnInit, OnDestroy, Injectable} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSidenavModule } from '@angular/material';
//import { VERSION } from '@angular/material';
import { NavItem } from './nav-item';
import { NavService } from './nav.service';
import {AuthenticationService} from '../services/authentication.service';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {NgxSpinnerService} from 'ngx-spinner';

@Component({
  selector: 'app-dashboard-parent',
  templateUrl: './dashboard-parent.component.html',
  styleUrls: ['./dashboard-parent.component.scss']
})
export class DashboardParentComponent implements OnInit, OnDestroy {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  // news = [];
  error_message = '';
  lang = '';
  langCode = '';

  constructor(private breakpointObserver: BreakpointObserver, private navService: NavService, private autenticationService: AuthenticationService, public router: Router, public userService: UserService, private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();

    // this.userService.getNews().subscribe((data: any) => this.news = data.news, (data: any) => {
    //     this.error_message = data.error.message;
    //   });
    const role = this.autenticationService.role;
    if (role === 'admin') {
      this.navItems.push(
        {
        displayName: 'Admin',
        iconName: 'accessibility',
        route: '',
        children: [
          {
            displayName: 'Categories',
            iconName: '',
            route: 'categories',
          },
          {
            displayName: 'Sub categories',
            iconName: '',
            route: 'sub_categories',
          },
          {
            displayName: 'Currencies',
            iconName: '',
            route: 'currencies',
          },
          {
            displayName: 'Countries',
            iconName: '',
            route: 'countries',
          },
          {
            displayName: 'Cities',
            iconName: '',
            route: 'cities',
          },
        ]
      }
      );
    }
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnDestroy(): void {
  }

  logout() {
    this.spinner.show()
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
      const element = document.getElementById("menuButton");
      element.classList.remove("cdk-focused");
      element.classList.remove("cdk-program-focused");
    }
  }

  // clear(newsId: number) {
  //   this.userService.clearNews(newsId).subscribe((data: any) => {
  //     this.userService.getNews().subscribe((data: any) => this.news = data.news, (data: any) => {
  //       this.error_message = data.error.message;
  //     })}, (data: any) => {
  //       this.error_message = data.error.message;
  //   });
  // }

  @ViewChild('appDrawer') appDrawer: ElementRef;
  //version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Profile',
      iconName: 'account_circle',
      route: 'profile',
    },
    {
      displayName: 'Bills',
      iconName: 'list_alt',
      route: 'bills',
      /*children: [
        {
          displayName: 'Profits',
          iconName: 'attach_money',
          route: 'profits',
        },
        {
          displayName: 'Costs',
          iconName: 'money_off',
          route: 'costs',
        },
      ]*/
    },
    {
      displayName: 'Graph',
      iconName: 'equalizer',
      route: 'graph',
    },
    {
      displayName: 'Options',
      disabled: true,
      iconName: 'settings',
      route: 'settings',
    },
    {
      displayName: 'Application',
      iconName: 'apps',
      route: 'application',
    }
  ];

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }

}

/*export class SidenavAutosizeExample {
  @ViewChild('sidenav') sidenav: MatSidenavModule;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
}*/

/*export class AppComponent implements AfterViewInit {
  @ViewChild('appDrawer') appDrawer: ElementRef;
  //version = VERSION;
  navItems: NavItem[] = [
    {
      displayName: 'Profile',
      iconName: 'account_circle',
    },
    {
      displayName: 'Bills',
      iconName: 'list_alt',
      children: [
        {
          displayName: 'Profits',
          iconName: 'attach_money',
        },
        {
          displayName: 'Costs',
          iconName: 'money_off',
        },
      ]
    },
    {
      displayName: 'Graphs',
      iconName: 'equalizer',
    },
    {
      displayName: 'Options',
      disabled: true,
      iconName: 'settings',
    }
  ];

  constructor(private navService: NavService) {
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
}*/

@Injectable({
  providedIn: 'root'
})
export class DashboardParentGuard implements CanActivate {

  constructor(private autenticationService: AuthenticationService, public router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.autenticationService.getToken()) {
        return true;
    }
    // navigate to login page
    this.router.navigate(['login']);
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
}
