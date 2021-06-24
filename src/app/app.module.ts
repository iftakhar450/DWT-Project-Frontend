import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './Pages/login/login.component';
import { DashboardComponent } from './Pages/dashboard/dashboard.component';
import { TeacherDashboardComponent } from './Pages/teacher-dashboard/teacher-dashboard.component';
import { StudentDashboardComponent } from './Pages/student-dashboard/student-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule ,ToastrService } from 'ngx-toastr';
import { AuthGuard } from './auth/auth.guard';
import { ClassComponent } from './Pages/Admin/class/class.component';
import { SubjectComponent } from './Pages/Admin/subject/subject.component';
import { UserComponent } from './Pages/Admin/user/user.component';
import { NavigationComponent } from './Pages/navigation/navigation.component';

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
    NavigationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [ToastrService, AuthGuard ],
  bootstrap: [AppComponent]
})
export class AppModule { }
