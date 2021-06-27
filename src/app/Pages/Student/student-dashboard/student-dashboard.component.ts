import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  templateUrl: './student-dashboard.component.html',
  styleUrls: ['./student-dashboard.component.scss']
})
export class StudentDashboardComponent implements OnInit {

  constructor(private router: Router) {
    if (JSON.parse(localStorage.getItem('user')).role !== 'student') {
      this.router.navigate(['/login']);

    }
  }

  ngOnInit() {
  }

}
