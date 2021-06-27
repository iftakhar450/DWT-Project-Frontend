import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/Admin/dashboard/dashboard.component';
import { TeacherDashboardComponent } from './Pages/Teacher/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './Pages/Student/student-dashboard/student-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule ,ToastrService } from 'ngx-toastr';
import { AuthGuard } from './auth/auth.guard';
import { ClassComponent } from './Pages/Admin/class/class.component';
import { SubjectComponent } from './Pages/Admin/subject/subject.component';
import { UserComponent } from './Pages/Admin/user/user.component';
import { NavigationComponent } from './Pages/navigation/navigation.component';
import { TeacherSubjectViewComponent } from './Pages/Teacher/teacher-subject-view/teacher-subject-view.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { StudentSubjectViewComponent } from './Pages/Student/student-subject-view/student-subject-view.component';
import { TestManagementComponent } from './Pages/Teacher/test-management/test-management.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TeacherDashboardComponent,
    StudentDashboardComponent,
    ClassComponent,
    SubjectComponent,
    UserComponent,
    NavigationComponent,
    TeacherSubjectViewComponent,
    StudentSubjectViewComponent,
    TestManagementComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [ToastrService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
