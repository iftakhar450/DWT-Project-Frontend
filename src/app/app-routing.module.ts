import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClassComponent } from './Pages/Admin/class/class.component';
import { SubjectComponent } from './Pages/Admin/subject/subject.component';
import { UserComponent } from './Pages/Admin/user/user.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavigationComponent } from './Pages/navigation/navigation.component';
import { StudentDashboardComponent } from './Pages/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './Pages/teacher-dashboard/teacher-dashboard.component';


const routes: Routes = [
  {
    path: '', component: NavigationComponent, children: [
      { path: '', redirectTo: 'admin', pathMatch: 'full' },
      {
        path: 'admin', children: [
          { path: '', component: DashboardComponent },
          { path: 'class', component: ClassComponent },
          { path: 'user', component: UserComponent },
          { path: 'subject', component: SubjectComponent },
        ]
      },
      { path: 'teachers', component: TeacherDashboardComponent },
      { path: 'students', component: StudentDashboardComponent },
    ],
    canActivate: [AuthGuard]
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
