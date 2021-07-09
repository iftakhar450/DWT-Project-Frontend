import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  navigations: any = [];
  loginPerson: any = 'Admin';
  name: any = '';
  profileRoute: any = '/admin/profile';
  chatRoute: any = '/admin/chat';

  user_id: any;
  constructor(private router: Router, private mainService: MainService, private app: AppComponent) { }

  ngOnInit() {

    this.name = JSON.parse(localStorage.getItem('user')).name;
    this.user_id = JSON.parse(localStorage.getItem('user'))._id;
    if (JSON.parse(localStorage.getItem('user')).role == 'admin') {
      this.navigations = [
        { name: 'Dashboard', path: '/admin', icon: 'fa fa-desktop' },
        { name: 'Users', path: '/admin/user', icon: 'fa fa-users' },
        { name: 'Classes', path: '/admin/class', icon: 'fa fa-laptop' },
        { name: 'Subjects', path: '/admin/subject', icon: 'fa fa-book' }
      ]
      this.profileRoute = '/admin/profile';
      this.chatRoute =  '/admin/chat'
      this.loginPerson = 'Admin';
    } else if (JSON.parse(localStorage.getItem('user')).role == 'student') {
      this.navigations = [
        { name: 'Dashboard', path: '/students', icon: 'fa fa-desktop' },
        { name: 'Subjects', path: '/students/subject', icon: 'fa fa-book' },
        { name: 'Results', path: '/students/result', icon: 'icon_piechart' }
      ]
      this.profileRoute = '/students/profile';
      this.chatRoute =  '/students/chat'
      this.loginPerson = 'Student';
    } else {
      this.navigations = [
        { name: 'Dashboard', path: '/teachers', icon: 'fa fa-desktop' },
        { name: 'Subjects', path: '/teachers/subject', icon: 'fa fa-book' },
        { name: 'Manage Test', path: '/teachers/test', icon: 'fa fa-cubes' },
      ]
      this.profileRoute = '/teachers/profile';
      this.loginPerson = 'Teacher';
      this.chatRoute =  '/teachers/chat'
    }
    this.checkIfNewMessageExsist();
  }

  // logOutUser
  logOutUser() {
    localStorage.clear();
    this.router.navigate(['/login'], { replaceUrl: true });
  }


  checkIfNewMessageExsist() {
    let url = environment.checkIfNewMessage + this.user_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      if(res.msg) {
        this.app.showInfo('You have new message')
      }
    }, error => {
      console.log(error);
    })
  }

}
