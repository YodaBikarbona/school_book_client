import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';


// Import angular material
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LayoutModule} from '@angular/cdk/layout';
import {MatToolbarModule, MatSidenavModule, MatListModule} from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material';
import {MatRadioModule} from '@angular/material/radio';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LoginComponent} from './login/login.component';

import {AuthenticationService} from './services/authentication.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import {DialogActivationComponent} from './login/activation.component';
import {NavService} from './dashboard/nav.service';
import {JWTHeaderInterceptor} from './authorization-header.interceptor';
import {MenuListItemComponent} from './menu-list-item/menu-list-item.component';
import {DashboardParentComponent} from './dashboard/dashboard-parent.component';
import {GradesComponent} from './grades/grades.component';
import {DialogGradeComponent} from './grades/grade.component';
import {NgxMatDatetimePickerModule, NgxMatTimepickerModule} from 'ngx-mat-datetime-picker';
import {EventsComponent} from './events/events.component';
import {AbsencesComponent} from './absences/absences.component';
import {ProgressComponent} from './progress/progress.component';
import {DashboardAdminComponent} from './dashboard/dashboard-admin.component';
import {DialogNewRoleComponent} from './roles/new-role.component';
import {DialogDeleteRoleComponent} from './roles/delete-role.component';
import {RolesComponent} from './roles/roles.component';
import {UsersComponent} from './users/users.component';
import {DialogNewUserComponent} from './users/new-user.component';
import {DialogEditUserComponent} from './users/edit-user.component';
import {DialogChangePasswordComponent} from './users/change-password.component';
import {DialogDeleteUserComponent} from './users/delete-user.component';
import { SchoolSubjectsComponent } from './school-subjects/school-subjects.component';
import { DialogEditRoleComponent } from './roles/edit-role.component';
import { DialogNewSchoolSubjectComponent } from './school-subjects/new-school-subject.component';
import { DialogDeleteSchoolSubjectComponent } from './school-subjects/delete-school-subject.component';
import { DialogEditSchoolSubjectComponent } from './school-subjects/edit-school-subject.component';
import { SchoolClassesComponent } from './school-classes/school-classes.component';
import { DialogNewSchoolClassComponent } from './school-classes/new-school-class.component';
import { DialogDeleteSchoolClassComponent } from './school-classes/delete-school-class.component';
import { DialogEditSchoolClassComponent } from './school-classes/edit-school-class.component';
import { SchoolClassMembersComponent } from './school-class-members/school-class-members.component';
import { DialogNewSchoolClassMemberComponent } from './school-class-members/new-school-class-member.component';

// Font awesome
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import { DialogEditSchoolClassMemberComponent } from './school-class-members/edit-school-class-member.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    DashboardParentComponent,
    MenuListItemComponent,
    DialogActivationComponent,
    GradesComponent,
    DialogGradeComponent,
    EventsComponent,
    AbsencesComponent,
    ProgressComponent,
    DashboardAdminComponent,
    RolesComponent,
    DialogNewRoleComponent,
    DialogDeleteRoleComponent,
    UsersComponent,
    DialogNewUserComponent,
    DialogEditUserComponent,
    DialogChangePasswordComponent,
    DialogDeleteUserComponent,
    SchoolSubjectsComponent,
    DialogEditRoleComponent,
    DialogNewSchoolSubjectComponent,
    DialogDeleteSchoolSubjectComponent,
    DialogEditSchoolSubjectComponent,
    SchoolClassesComponent,
    DialogNewSchoolClassComponent,
    DialogDeleteSchoolClassComponent,
    DialogEditSchoolClassComponent,
    SchoolClassMembersComponent,
    DialogNewSchoolClassMemberComponent,
    DialogEditSchoolClassMemberComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
    MatIconModule, // Angular material
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSlideToggleModule,
    MatCardModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    FontAwesomeModule,
  ],
  entryComponents: [
    DialogActivationComponent,
    DialogGradeComponent,
    DialogDeleteRoleComponent,
    DialogNewRoleComponent,
    DialogNewUserComponent,
    DialogEditUserComponent,
    DialogChangePasswordComponent,
    DialogDeleteUserComponent,
    DialogEditRoleComponent,
    DialogNewSchoolSubjectComponent,
    DialogDeleteSchoolSubjectComponent,
    DialogEditSchoolSubjectComponent,
    DialogNewSchoolClassMemberComponent,
    DialogDeleteSchoolClassComponent,
    DialogNewSchoolClassComponent,
    DialogEditSchoolClassComponent,
    DialogEditSchoolClassMemberComponent
  ],
  providers: [NavService, {provide: HTTP_INTERCEPTORS, useClass: JWTHeaderInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
