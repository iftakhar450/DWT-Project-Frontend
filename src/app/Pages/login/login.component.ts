import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });
  constructor(private mainService: MainService, private app: AppComponent, private router: Router) {
    console.log(environment.login)
  }

  ngOnInit() {
  }

  login() {
    if (this.loginForm.valid) {
      this.mainService.post(environment.login, this.loginForm.value).subscribe(res => {
        this.app.showSuccess('Login Successfull')
        localStorage.setItem('user', JSON.stringify(res));
        if (res.role == 'admin') {
          this.router.navigate(['/']);
        } else if (res.role == 'student') {
          this.router.navigate(['/students']);
        } else {
          this.router.navigate(['/teachers']);
        }
      }, error => {
        console.log(error)
        this.app.showError(error.error)
      })
    } else {

    }
  }

}
