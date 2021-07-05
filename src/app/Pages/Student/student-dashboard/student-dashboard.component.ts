import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  student_id: any;
  class_id: any;


  allSubject: any;
  allTest: any;
  constructor(private router: Router, private mainService: MainService) {
    if (JSON.parse(localStorage.getItem('user')).role !== 'student') {
      this.router.navigate(['/login']);

    }
  }

  ngOnInit() {
    this.class_id = JSON.parse(localStorage.getItem('user')).class_is;
    this.student_id = JSON.parse(localStorage.getItem('user'))._id;
    this.studentSubject();
  }

  studentSubject() {
    let url = environment.getClassSubject + this.class_id;
    this.mainService.get(url).subscribe(res => {
      let subjectIDs = [];
      if (res.subjects.length > 0) {
        res.subjects.forEach(element => {
          subjectIDs.push(element._id)
        });
        this.studentTest(subjectIDs);
      }
      this.allSubject = res.subjects.length
    }, error => {
      console.log(error)
    })
  }
  studentTest(ids) {
    let url = environment.getTestForStudent;
    this.mainService.post(url, { subject_ids: ids }).subscribe(res => {
      this.allTest = res.Tests.length;
    }, error => {
      console.log(error)
    })
  }
}
