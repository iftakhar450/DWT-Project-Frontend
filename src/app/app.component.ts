import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { MainService } from './Services/main.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DWT-Project-Frontend';
  user_id: any;
  

  constructor(private toastr: ToastrService, private mainService: MainService) {
    // this.user_id = JSON.parse(localStorage.getItem('user'))._id;
    // this.checkIfNewMessageExsist();

  }

  showSuccess(text) {
    this.toastr.success(text, '');
  }
  showError(text) {
    this.toastr.error(text, '');
  }
  showInfo(text) {
    this.toastr.info(text, 'Notification');
  }
  
  checkIfNewMessageExsist() {
    let url = environment.checkIfNewMessage + this.user_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

}
