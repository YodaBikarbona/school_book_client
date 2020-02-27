import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {DashboardComponent, DashboardGuard} from './dashboard/dashboard.component';
import {DashboardParentComponent, DashboardParentGuard} from './dashboard/dashboard-parent.component';
import {GradesComponent} from './grades/grades.component';
import {EventsComponent} from './events/events.component';
import {AbsencesComponent} from './absences/absences.component';
import {ProgressComponent} from './progress/progress.component';
import {DashboardAdminComponent, DashboardAdminGuard} from './dashboard/dashboard-admin.component';
import {RolesComponent} from './roles/roles.component';
import {UsersComponent} from './users/users.component';
import {SchoolSubjectsComponent} from './school-subjects/school-subjects.component';
import {SchoolClassesComponent} from './school-classes/school-classes.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [DashboardGuard],
    // children: [
    //   {path: '', component: DashboardComponent},
    //   // {path: 'profile', component: DashboardComponent, resolve: {user: UserResolver, countries: CountryResolver}},
    //   {path: 'profile'},
    //   {path: 'bills',
    //     /*children: [
    //       {path: "profits", component: BillsComponent},
    //       {path: "costs", component: BillsComponent}
    //       ]*/
    //   },
    //   //{path: "profits", component: BillsComponent},
    //   //{path: "costs", component: BillsComponent},
    //   {path: 'graph'},
    //   {path: 'settings'},
    //   {path: 'application',
    //   children: [
    //     {path: 'bugs'},
    //     {path: 'suggestions'},
    //     {path: 'info'}
    //   ]}]
  },
  {
    path: 'parentDashboard', component: DashboardParentComponent, canActivate: [DashboardParentGuard],
    children: [
      {
        path: 'grades', component: GradesComponent
      },
      {
        path: 'events', component: EventsComponent
      },
      {
        path: 'absences', component: AbsencesComponent
      },
      {
        path: 'progress', component: ProgressComponent
      }
    ]
  },
  {
    path: 'adminDashboard', component: DashboardAdminComponent, canActivate: [DashboardAdminGuard],
    children: [
      {
        path: 'users', component: UsersComponent
      },
      {
        path: 'roles', component: RolesComponent
      },
      {
        path: 'schoolSubjects', component: SchoolSubjectsComponent
      },
      {
        path: 'schoolClasses', component: SchoolClassesComponent
      }
    ]
  },
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
