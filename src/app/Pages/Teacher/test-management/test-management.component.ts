import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StringifyOptions } from 'querystring';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-management',
  templateUrl: './test-management.component.html',
  styleUrls: ['./test-management.component.scss']
})
export class TestManagementComponent implements OnInit {
  newTestForm: FormGroup;

  allTests: any[];
  allSubjects: any = [];
  selectedTest: any = {};
  teacher_id: any = '';


  @ViewChild('newTestClosebutton', { static: true }) newTestClosebutton;
  @ViewChild('deleteTestClosebutton', { static: true }) deleteTestClosebutton;
  @ViewChild('updateTestClosebutton', { static: true }) updateTestClosebutton;
  constructor(private fb: FormBuilder, private mainService: MainService, private app: AppComponent) {
    this.teacher_id = JSON.parse(localStorage.getItem('user'))._id;

  }

  ngOnInit() {
    this.newTestForm = this.fb.group({
      name: ['', Validators.required],
      date: [new Date(), Validators.required],
      subject: ['', Validators.compose([Validators.required])],
      teacher: [this.teacher_id],
      // class: ['', Validators.required]
    });

    this.restNewFor();

    // this.getAllTest();
    this.loadTeacherSubject();
    this.loadTeacherTest();
  }


  restNewFor() {
    this.newTestForm.controls.name.setValue('');
    this.newTestForm.controls.teacher.setValue(this.teacher_id);
    this.newTestForm.controls.date.setValue(new Date());
    this.newTestForm.controls.date.setValue(new Date(this.newTestForm.controls.date.value.getTime() - this.newTestForm.controls.date.value.getTimezoneOffset() * 60000).toISOString());
    this.newTestForm.controls.date.setValue(this.newTestForm.controls.date.value.substring(0, this.newTestForm.controls.date.value.length - 8));
  }


  loadTeacherSubject() {
    let url = environment.getTeacherSubject + this.teacher_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      this.allSubjects = res.subjects;
    }, error => {
      console.log(error);

    })
  }


  // subjectChange slection 
  subjectChange() {
    // console.log('-----------')
  }
  // 
  saveTest() {
    this.newTestForm.markAllAsTouched();
    // console.log(typeof this.newTestForm.controls.teacher.value)
    // console.log(typeof this.newTestForm.controls.subject.value)
    if (this.newTestForm.valid) {
      this.mainService.post(environment.testDefault, this.newTestForm.value).subscribe(res => {
        // console.log(res)
        this.app.showSuccess('Test Created Successfuly');
        this.newTestClosebutton.nativeElement.click();
        this.newTestForm.reset();
        this.restNewFor();
        this.loadTeacherTest();
      }, error => {
        // console.log(error)
        this.newTestClosebutton.nativeElement.click();
        this.app.showError('Test Creating Error');
      })
    } else {
      console.log(this.newTestForm.value)
      console.log('eee')
    }
  }

  // load all tes available test
  loadTeacherTest() {
    let url = environment.getTeacherTests + this.teacher_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      this.allTests = res.tests;
    }, error => {
      console.log(error);
    })
  }


  // deleteOpenModal
  updateSelectedTest(id) {
    // console.log(id)
    this.selectedTest = this.allTests.filter(u => u._id === id)[0];
    console.log(this.selectedTest);
  }

  // updateTest info
  updateTest() {
    let url = environment.testDefault + '/' + this.selectedTest._id;
    this.mainService.update(url, this.selectedTest).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.updateTestClosebutton.nativeElement.click();
      this.loadTeacherTest();
    }, error => {
      this.updateTestClosebutton.nativeElement.click();
      this.app.showError('Something went wrong')
    })
  }
  // confirmDelete
  confirmDelete() {
    let url = environment.testDefault + '/' + this.selectedTest._id
    this.mainService.delete(url).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.deleteTestClosebutton.nativeElement.click();
      this.loadTeacherTest();
    }, error => {
      console.log(error)
      this.deleteTestClosebutton.nativeElement.click();
    })
  }
}


