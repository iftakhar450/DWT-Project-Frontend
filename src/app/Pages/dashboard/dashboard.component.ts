import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) {
    if (JSON.parse(localStorage.getItem('user')).role == 'admin') {
      this.router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).role == 'student') {
      this.router.navigate(['/students']);
    } else {
      this.router.navigate(['/teachers']);
    }
  }

  ngOnInit() {
  }

}
