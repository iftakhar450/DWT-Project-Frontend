import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

  newClassForm: FormGroup;

  allClass: any[];
  selectedClass: any = {};
  @ViewChild('newClassClosebutton', { static: true }) newClassClosebutton;
  @ViewChild('deleteClassClosebutton', { static: true }) deleteClassClosebutton;
  @ViewChild('updateClassClosebutton', { static: true }) updateClassClosebutton;
  constructor(private fb: FormBuilder, private mainService: MainService, private app: AppComponent) {

  }

  ngOnInit() {
    this.newClassForm = this.fb.group({
      name: ['', Validators.required],
    });

    // 
    this.getAllClass();
  }

  // get Class list
  getAllClass() {
    this.mainService.get(environment.classDefault).subscribe(res => {
      console.log(res.classes);
      this.allClass = res.classes;
    }, error => {
      console.log(error)
    })
  }
  // save Class
  saveClass() {
    this.newClassForm.markAllAsTouched();
    if (this.newClassForm.valid) {
      this.mainService.post(environment.classDefault, this.newClassForm.value).subscribe(res => {
        // console.log(res)
        this.app.showSuccess('Class Created Successfuly');
        this.newClassClosebutton.nativeElement.click();
        this.newClassForm.reset();
        this.getAllClass();
      }, error => {
        console.log(error)
        this.newClassClosebutton.nativeElement.click();
        this.app.showError(error.error.msg);
      })
    }
  }

  // updateClass info
  updateClass() {
    let url = environment.classDefault + '/' + this.selectedClass._id;
    this.mainService.update(url, this.selectedClass).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.updateClassClosebutton.nativeElement.click();
      this.getAllClass();
    }, error => {
      this.updateClassClosebutton.nativeElement.click();
      this.app.showError('Something went wrong')
    })
  }
  // deleteOpenModal
  updateSelectedClass(id) {
    this.selectedClass = this.allClass.filter(u => u._id === id)[0];
  }

  // confirmDelete
  confirmDelete() {
    let url = environment.classDefault + '/' + this.selectedClass._id
    this.mainService.delete(url).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.deleteClassClosebutton.nativeElement.click();
      this.getAllClass();
    }, error => {
      console.log(error)
      this.deleteClassClosebutton.nativeElement.click();
    })
  }

}
