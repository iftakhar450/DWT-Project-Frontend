import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { ClassComponent } from './Pages/Admin/class/class.component';
import { SubjectComponent } from './Pages/Admin/subject/subject.component';
import { UserComponent } from './Pages/Admin/user/user.component';
import { DashboardComponent } from './Pages/Admin/dashboard/dashboard.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavigationComponent } from './Pages/navigation/navigation.component';
import { StudentDashboardComponent } from './Pages/Student/student-dashboard/student-dashboard.component';
import { TeacherDashboardComponent } from './Pages/Teacher/teacher-dashboard/teacher-dashboard.component';
import { TeacherSubjectViewComponent } from './Pages/Teacher/teacher-subject-view/teacher-subject-view.component';
import { StudentSubjectViewComponent } from './Pages/Student/student-subject-view/student-subject-view.component';
import { TestManagementComponent } from './Pages/Teacher/test-management/test-management.component';


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
      {
        path: 'teachers', children: [
          { path: '', component: TeacherDashboardComponent },
          { path: 'subject', component: TeacherSubjectViewComponent },
          { path: 'test', component: TestManagementComponent }
        ]
      },
      {
        path: 'students', children: [
          { path: '', component: StudentDashboardComponent },
          { path: 'subject', component: StudentSubjectViewComponent }
        ]
      },
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
