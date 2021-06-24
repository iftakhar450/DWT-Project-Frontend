import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})


export class UserComponent implements OnInit {
  newUserForm: FormGroup;

  allUser: any[];
  selectedUser: any = {};
  @ViewChild('newUserClosebutton', { static: true }) newUserClosebutton;
  @ViewChild('deleteUserClosebutton', { static: true }) deleteUserClosebutton;
  @ViewChild('updateUserClosebutton', { static: true }) updateUserClosebutton;
  constructor(private fb: FormBuilder, private mainService: MainService, private app: AppComponent) {

  }

  ngOnInit() {
    this.newUserForm = this.fb.group({
      name: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.compose([Validators.required])],
      mobile_no: ['', [Validators.required]],
      role: ['admin', [Validators.required]],
    });

    // 
    this.getAllUser();
  }

  // get user list
  getAllUser() {
    this.mainService.get(environment.userDefault).subscribe(res => {
      console.log(res.users);
      this.allUser = res.users;
    }, error => {
      console.log(error)
    })
  }
  // save user
  saveUser() {
    this.newUserForm.markAllAsTouched();
    if (this.newUserForm.valid) {
      this.mainService.post(environment.userDefault, this.newUserForm.value).subscribe(res => {
        // console.log(res)
        this.app.showSuccess('User Created Successfuly');
        this.newUserClosebutton.nativeElement.click();
        this.newUserForm.reset();
        this.getAllUser();
      }, error => {
        // console.log(error)
        this.newUserClosebutton.nativeElement.click();
        this.app.showError('User Creating Error');
      })
    }
  }

  // updateUser info
  updateUser() {
    let url = environment.userDefault + '/' + this.selectedUser._id;
    this.mainService.update(url, this.selectedUser).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.updateUserClosebutton.nativeElement.click();
      this.getAllUser();
    }, error => {
      this.updateUserClosebutton.nativeElement.click();
      this.app.showError('Something went wrong')
    })
  }
  // deleteOpenModal
  updateSelectedUser(id) {
    this.selectedUser = this.allUser.filter(u => u._id === id)[0];
  }

  // confirmDelete
  confirmDelete() {
    let url = environment.userDefault + '/' + this.selectedUser._id
    this.mainService.delete(url).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.deleteUserClosebutton.nativeElement.click();
      this.getAllUser();
    }, error => {
      console.log(error)
      this.deleteUserClosebutton.nativeElement.click();
    })
  }

}
