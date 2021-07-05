import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {
  allSubjects: any;
  allTests: any;
  teacher_id: any;

  constructor(private router: Router, private mainService: MainService) {
    // console.log(JSON.parse(localStorage.getItem('user')).role)
    if (JSON.parse(localStorage.getItem('user')).role !== 'teacher') {
      this.router.navigate(['/login']);

    }
  }
  ngOnInit() {
    this.teacher_id = JSON.parse(localStorage.getItem('user'))._id;
    this.loadSubject();
    this.loadTeacherTest();
  }


  // load all tes available test
  loadTeacherTest() {
    let url = environment.getTeacherTests + this.teacher_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      this.allTests = res.tests;
    }, error => {
      console.log(error);
    })
  }

  loadSubject() {
    let url = environment.getTeacherSubject + this.teacher_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      this.allSubjects = res.subjects;
    }, error => {
      console.log(error);

    })
  }

}
