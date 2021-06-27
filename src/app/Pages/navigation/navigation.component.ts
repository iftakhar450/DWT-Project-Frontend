import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navigations: any = [];
  loginPerson: any = 'Admin';
  name: any = '';
  constructor(private router: Router) { }

  ngOnInit() {

    this.name = JSON.parse(localStorage.getItem('user')).name;
    if (JSON.parse(localStorage.getItem('user')).role == 'admin') {
      this.navigations = [
        { name: 'Dashboard', path: '/admin', icon: 'fa fa-desktop' },
        { name: 'Users', path: '/admin/user', icon: 'fa fa-users' },
        { name: 'Classes', path: '/admin/class', icon: 'fa fa-laptop' },
        { name: 'Subjects', path: '/admin/subject', icon: 'fa fa-book' }
      ]
      this.loginPerson = 'Admin';
    } else if (JSON.parse(localStorage.getItem('user')).role == 'student') {
      this.navigations = [
        { name: 'Dashboard', path: '/students', icon: 'fa fa-desktop' },
        { name: 'Subjects', path: '/students/subject', icon: 'fa fa-book' },
        // { name: 'Profile', path: '/student/subject', icon: 'fa fa-book' }
      ]
      this.loginPerson = 'Student';
    } else {
      this.navigations = [
        { name: 'Dashboard', path: '/teachers', icon: 'fa fa-desktop' },
        { name: 'Subjects', path: '/teachers/subject', icon: 'fa fa-book' },
        { name: 'Manage Test', path: '/teachers/test', icon: 'fa fa-cubes' },
      ]
      this.loginPerson = 'Teacher';
    }
  }

  // logOutUser
  logOutUser() {
    localStorage.clear();
    this.router.navigate(['/login'],  { replaceUrl: true });
  }

}
