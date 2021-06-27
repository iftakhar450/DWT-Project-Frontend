import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-teacher-subject-view',
  templateUrl: './teacher-subject-view.component.html',
  styleUrls: ['./teacher-subject-view.component.scss']
})
export class TeacherSubjectViewComponent implements OnInit {
  allSubjects: any = [];
  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.loadSubject();
  }

  loadSubject() {
    let teacher_id = JSON.parse(localStorage.getItem('user'))._id;
    let url = environment.getTeacherSubject + teacher_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      this.allSubjects = res.subjects;
    }, error => {
      console.log(error);

    })
  }

}
