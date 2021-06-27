import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardData: any = {};
  constructor(private router: Router, private mainService: MainService) {
    if (JSON.parse(localStorage.getItem('user')).role == 'admin') {
      this.router.navigate(['/']);
    } else if (JSON.parse(localStorage.getItem('user')).role == 'student') {
      this.router.navigate(['/students']);
    } else {
      this.router.navigate(['/teachers']);
    }
  }

  ngOnInit() {
    this.loadDashboardData();
  }
  loadDashboardData() {
    this.mainService.get(environment.adminDashboardData).subscribe(res => {
      this.dashboardData = res;
      console.log(res)
    }, error => {
      console.log(error)
    })

  }

}
