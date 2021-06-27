import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  templateUrl: './teacher-dashboard.component.html',
  styleUrls: ['./teacher-dashboard.component.scss']
})
export class TeacherDashboardComponent implements OnInit {

  constructor(private router: Router) {
    // console.log(JSON.parse(localStorage.getItem('user')).role)
    if (JSON.parse(localStorage.getItem('user')).role !== 'teacher') {
      this.router.navigate(['/login']);

    }
  }

  ngOnInit() {
  }

}
