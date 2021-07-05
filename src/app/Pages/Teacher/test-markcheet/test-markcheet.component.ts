import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CsvExportService } from 'src/app/Services/csv-export.service';
import { MainService } from 'src/app/Services/main.service';
import { environment } from 'src/environments/environment';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { AppComponent } from 'src/app/app.component';
import { PdfMakeService } from 'src/app/Services/pdf-make.service';
@Component({
  selector: 'app-test-markcheet',
  templateUrl: './test-markcheet.component.html',
  styleUrls: ['./test-markcheet.component.scss']
})
export class TestMarkcheetComponent implements OnInit {
  test_id: any;
  markSheet: any = [];
  testInfo: any = {};

  csvRecords: any[] = [];
  header = true;

  fileReadError: any = '';

  selectedResult: any;


  @ViewChild('importCSVModal', { static: true }) importCSVModal;
  @ViewChild('testResultClosebutton', { static: true }) testResultClosebutton;
  @ViewChild('testSigleResultClosebutton', { static: true }) testSigleResultClosebutton;
  constructor(private _Activatedroute: ActivatedRoute, private mainService: MainService, private ngxCsvParser: NgxCsvParser,
    private CSVExport: CsvExportService, private app: AppComponent, private pdfmake: PdfMakeService) {
    this.test_id = this._Activatedroute.snapshot.params['test_id'];
  }

  ngOnInit() {
    this.studentForTest();
  }

  studentForTest() {
    let url = environment.getTestsMarkscheet + this.test_id;
    this.mainService.get(url).subscribe(res => {
      console.log(res);
      this.testInfo = res.test;
      this.markSheet = [];
      if (res.markssheet && res.markssheet.length > 0) {
        res.markssheet.forEach(element => {
          let obj = {
            _id: element._id,
            user_id: element.student.user_id,
            name: element.student.name,
            result: element.result
          }
          this.markSheet.push(obj);

        });
      }

    }, error => {
      console.log(error)
    })
  }


  exportCSV() {
    this.CSVExport.exportCSV(this.markSheet, this.testInfo.name + '-Markscheet');
  }

  exportPDF() {
    this.pdfmake.generatePdf(this.markSheet, Object.keys(this.markSheet[0]));
  }

  // Your applications input change listener for the CSV File
  fileChangeListener($event: any): void {

    // Select the files from the event
    const files = $event.srcElement.files;

    // Parse the file you want to select for the operation along with the configuration
    this.ngxCsvParser.parse(files[0], { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        // console.log('Result', result);
        this.csvRecords = result;
        this.fileReadError = '';
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
        this.fileReadError = error;
      });

  }

  uploadResult() {
    if (this.csvRecords.length > 0) {
      this.fileReadError = '';
      let url = environment.updateMultipleTestResult;
      this.mainService.post(url, this.csvRecords).subscribe(res => {
        this.app.showSuccess(res.msg);
        this.testResultClosebutton.nativeElement.click();
        this.studentForTest();
      }, error => {
        console.log(error);
      })
    } else {
      this.fileReadError = 'file is empty'
    }
  }


  selectedTest(result) {
    // console.log(result)
    this.selectedResult = result;
  }

  // update Single result
  updateSingleResult() {
    let url = environment.updateSingleTestResult;
    this.mainService.post(url, this.selectedResult).subscribe(res => {
      this.app.showSuccess(res.msg);
      this.testSigleResultClosebutton.nativeElement.click();
      this.studentForTest();
    }, error => {
      console.log(error)
    })
  }
}
