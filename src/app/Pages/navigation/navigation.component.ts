import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navigations: any = [];
  loginPerson: any = 'Admin';
  constructor() { }

  ngOnInit() {
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
        { name: 'Dashboard', path: '/student', icon: 'fa fa-desktop' },
        { name: 'Subjects', path: '/student/subject', icon: 'fa fa-book' },
        // { name: 'Profile', path: '/student/subject', icon: 'fa fa-book' }
      ]
      this.loginPerson = 'Student';
    } else {
      this.loginPerson = 'Teacher';
    }
  }

}
