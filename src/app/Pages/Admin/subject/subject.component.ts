import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {


  newSubjectForm: FormGroup;

  allSubject: any[] ;
  allTeachers: any[];
  allClasses: any[];
  selectedSubject: any = {};
  isArchive: any;
  @ViewChild('newSubjectClosebutton', { static: true }) newSubjectClosebutton;
  @ViewChild('deleteSubjectClosebutton', { static: true }) deleteSubjectClosebutton;
  @ViewChild('updateSubjectClosebutton', { static: true }) updateSubjectClosebutton;
  @ViewChild('archiveSubjectClosebutton', { static: true }) archiveSubjectClosebutton;
  constructor(private fb: FormBuilder, private mainService: MainService, private app: AppComponent) {

  }

  ngOnInit() {
    this.newSubjectForm = this.fb.group({
      s_id: ['', Validators.required],
      title: ['', Validators.required],
      teacher: ['', Validators.required],
      class: ['', Validators.required],

    });

    // 
    this.getAllSubject();
    this.loadTeachers();
    this.loadClasses();
  }

  // get Subject list
  getAllSubject() {
    this.mainService.get(environment.subjectDefault).subscribe(res => {
      console.log(res.subjects);
      this.allSubject = res.subjects;
    }, error => {
      console.log(error)
    })
  }

  // load Teachers
  loadTeachers() {
    this.mainService.get(environment.filterUsers + 'teacher').subscribe(res => {
      this.allTeachers = res.users;
    }, error => {

    })
  }
  // load Classes
  loadClasses() {
    this.mainService.get(environment.classDefault).subscribe(res => {
      this.allClasses = res.classes;
    }, error => {

    })
  }

  // save Subject
  saveSubject() {
    this.newSubjectForm.markAllAsTouched();
    if (this.newSubjectForm.valid) {
      this.mainService.post(environment.subjectDefault, this.newSubjectForm.value).subscribe(res => {
        // console.log(res)
        this.app.showSuccess('Subject Created Successfuly');
        this.newSubjectClosebutton.nativeElement.click();
        this.newSubjectForm.reset();
        this.getAllSubject();
      }, error => {
        console.log(error)
        this.newSubjectClosebutton.nativeElement.click();
        this.app.showError(error.error.msg);
      })
    }
  }

  // updateSubject info
  updateSubject() {
    let url = environment.subjectDefault + '/' + this.selectedSubject._id;
    // console.log(this.selectedSubject.teacher);
    this.mainService.update(url, this.selectedSubject).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.updateSubjectClosebutton.nativeElement.click();
      this.getAllSubject();
    }, error => {
      this.updateSubjectClosebutton.nativeElement.click();
      console.log(error);
      this.app.showError('Something went wrong')
    })
  }
  // deleteOpenModal
  updateSelectedSubject(id) {
    // console.log(id)
    this.selectedSubject = this.allSubject.filter(u => u._id === id)[0];
    console.log(this.selectedSubject);
  }

  // confirmDelete
  confirmDelete() {
    let url = environment.subjectDefault + '/' + this.selectedSubject._id
    this.mainService.delete(url).subscribe(res => {
      if(res.code) {
        this.app.showInfo(res.msg);
      }else {
        this.app.showSuccess(res.msg);
      }

      this.deleteSubjectClosebutton.nativeElement.click();
      this.getAllSubject();
    }, error => {
      console.log(error)
      this.deleteSubjectClosebutton.nativeElement.click();
    })
  }


  archiveSubjectClick(d, id) {
    this.updateSelectedSubject(id);
    this.isArchive = d;
  }

  archiveThisSubject() {
    let url = environment.archiveSubject + this.selectedSubject._id;

    console.log(this.isArchive)
    this.mainService.post(url, { isArchive: this.isArchive }).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.getAllSubject();
      this.archiveSubjectClosebutton.nativeElement.click();
    }, error => {
      console.log(error);
    })
  }

  compareFn = this._compareFn.bind(this);
  _compareFn(a, b) {
    // console.log(a)
    // console.log(b._id)
    if (a && b)
      return a._id == b._id;
  }
}
