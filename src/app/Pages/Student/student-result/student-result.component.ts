import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MainService } from 'src/app/Services/main.service';
import { PdfMakeService } from 'src/app/Services/pdf-make.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-student-result',
  templateUrl: './student-result.component.html',
  styleUrls: ['./student-result.component.scss']
})
export class StudentResultComponent implements OnInit {
  student_id: any;
  user: any;
  resultData: any = [];
  allSubject: any;
  class_id: any;

  totalAverage: any;
  @ViewChild('resultCardDiv', { static: false }) resultCardDiv: ElementRef;

  objectKeys = Object.keys;

  constructor(private mainService: MainService, private pdfService: PdfMakeService) { }

  ngOnInit() {
    this.student_id = JSON.parse(localStorage.getItem('user'))._id;
    this.class_id = JSON.parse(localStorage.getItem('user')).class_is;
    this.getStudentResult()
    this.studentSubject();
  }

  getStudentResult() {
    let url = environment.studentResultCard + this.student_id;
    this.mainService.get(url).subscribe(res => {
      this.user = res.user;
      this.resultData = this.groupById(res.resultData, 'subject');
      console.log(this.resultData);
    }, error => {
      console.log(error);
    })

  }

  studentSubject() {
    let url = environment.getClassSubject + this.class_id;
    this.mainService.get(url).subscribe(res => {
      // console.log(res.subjects)
      if (res.subjects.length > 0) {
        this.allSubject = this.groupById(res.subjects, '_id')
        // console.log(this.allSubject);
        this.calulateTotalAverage();
      }

    }, error => {
      console.log(error)
    })
  }

  groupById(array, field) {
    let group = array.reduce((r, a) => {
      r[a[field]] = [...r[a.organization] || [], a];
      return r;
    }, {});
    return group;
  }


  getSubjectProp(id, pro) {
    if (this.allSubject && this.allSubject[id]) {
      return this.allSubject[id][0][pro]
    } else {
      return '';
    }
  }

  CalculateSubjectAverage(data) {
    if (data.length > 0) {
      let avg = 0;
      data.forEach(element => {
        avg += Number(element.result);
      });
      avg /= data.length;
      return avg;
    } else {
      return 0;
    }
  }
  calulateTotalAverage() {
    let keys = this.objectKeys(this.resultData);
    let toAvg = 0;
    keys.forEach(element => {
      let sbAvg = 0;
      this.resultData[element].forEach(ele => {
        sbAvg += ele.result;
      });
      sbAvg /= this.resultData[element].length;
      toAvg += sbAvg;
    });
    // console.log()
    this.totalAverage =  toAvg / keys.length;
  }

  exportResultAsPdf() {
    this.pdfService.generateImagePDF(this.resultCardDiv.nativeElement);
  }

}
