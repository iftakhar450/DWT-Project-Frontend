import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-subject-view',
  templateUrl: './student-subject-view.component.html',
  styleUrls: ['./student-subject-view.component.scss']
})
export class StudentSubjectViewComponent implements OnInit {
  class_id: any;
  allSubject: any;
  student_id: any;
  subjectAllTest: any = [];

  constructor(private mainService: MainService) { }
  ngOnInit() {
    this.class_id = JSON.parse(localStorage.getItem('user')).class_is;
    this.student_id = JSON.parse(localStorage.getItem('user'))._id;
    this.studentSubject();
  }

  studentSubject() {
    let url = environment.getClassSubject + this.class_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res.subjects)
      this.allSubject = res.subjects
    }, error => {
      console.log(error)
    })
  }

  viewSubjectDetail(sid) {
    let data = {
      s_id: sid,
      id: this.student_id
    }
    let url = environment.studentSubjectDetail
    this.mainService.post(url, { data: data }).subscribe(res => {
      // console.log(res.allTest);
      this.subjectAllTest = res.allTest;
    }, error => {
      console.log(error)
    })
  }

  calculateAverage(data) {
    if (data.length > 0) {
      let avg = 0;
      data.forEach(element => {
        avg += element.result;
      });
      return avg / data.length;
    } else {
      return 0;
    }
  }

}
