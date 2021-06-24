import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'DWT-Project-Frontend';

  constructor(private toastr: ToastrService) {
  }

  showSuccess(text) {
    this.toastr.success(text, '');
  }
  showError(text) {
    this.toastr.error(text, '');
  }

}
