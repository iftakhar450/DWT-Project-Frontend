import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user: any = {};
  constructor(private mainService: MainService, private app: AppComponent) { }

  ngOnInit() {
    let id = JSON.parse(localStorage.getItem('user'))._id;
    // console.log(id);
    this.loadUserProfile(id)
  }
  loadUserProfile(id) {
    let url = environment.userDefault + '/' + id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      this.user = res.user;
    }, error => {
      console.log(error)
    })
  }

  saveUserInfo() {
    console.log(this.user);
    let url = environment.userDefault + '/' + JSON.parse(localStorage.getItem('user'))._id;
    this.mainService.update(url, this.user).subscribe(res => {
      // console.log(res);
      // localStorage.setItem('user', this.user);
      this.app.showSuccess(res.msg);
    }, error => {
      console.log(error)
    });

  }
}
