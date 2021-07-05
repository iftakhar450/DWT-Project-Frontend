import { Injectable } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import html2canvas from 'html2canvas';
@Injectable({
  providedIn: 'root'
})
export class PdfMakeService {

  pdfMake: any;
  constructor() {

  }
  async initilizePDFMake() {
    let pm: any;
    const pdfMakeModule = await import('pdfmake/build/pdfmake');
    const pdfFontsModule = await import('pdfmake/build/vfs_fonts');
    pm = pdfMakeModule.default;
    pm.vfs = pdfFontsModule.default.pdfMake.vfs;
    return pm;
  }

  async generatePdf(content, headerkeys) {

    // let strings = new Base64Strings();
    const documentDefinition = {
      info: {
        title: 'User-list',
        author: '',
        subject: 'subject of document',
        keywords: 'keywords for document',
      },
      // pageSize: 'LEGAL',
      // pageOrientation: 'landscape',
      pageMargins: [40, 80, 40, 40],
      header: {
        text: 'Markscheet',
        width: 150,
        alignment: 'center',
      },
      footer: [
        // {
        //   text: 'comany',
        //   alignment: 'center',
        //   style: 'footerHeading'
        // },
        // {
        //   text: 'address',
        //   alignment: 'center',
        //   style: 'footertext'
        // },
        {
          columns: [
            { text: '' },
            { text: '' }
          ]
        }

      ],

      content: [
        {
          text: 'Print Date: ' + new Date(),
          style: 'sectionHeader'
        },
        this.table(content, headerkeys)
      ],
      styles: {
        sectionHeader: {
          bold: true,
          decoration: 'underline',
          fontSize: 14,
          margin: [0, 15, 0, 15]
        },
        footerHeading: {
          bold: true,
          fontSize: 10,
        },
        footertext: {
          bold: true,
          fontSize: 7,
        }
      }
    };

    this.pdfMake = await this.initilizePDFMake();
    this.pdfMake.createPdf(documentDefinition).open();
  }

  table(data, columns) {
    return {
      table: {
        headerRows: 1,
        widths: this.binWidthOfColumns(columns),
        body: this.buildTableBody(data, columns)
      }
    };
  }
  binWidthOfColumns(columns) {
    let cols = ['*'];
    for (let i = 0; i < columns.length - 2; i++) {
      cols.push('auto');
    }
    return cols;
  }
  buildTableBody(data, columns) {
    var body = [];
    let headerRow = [];
    columns.forEach(element => {
      if (element != '_id')
        headerRow.push({ text: element.toUpperCase().toString(), bold: true })
    });

    body.push(headerRow);
    // console.log(body)
    data.forEach(function (row) {
      var dataRow = [];
      columns.forEach(function (column) {
        console.log(column)
        if (column != '_id') {
          dataRow.push(row[column]);
        }

      })
      body.push(dataRow);
    });
    console.log(body)

    return body;
  }


  // generate PDF of Image
  generateImagePDF(data) {
    html2canvas(data).then(async canvas => {
      const contentDataURL = canvas.toDataURL('image/png');
      const documentDefinition = {
        info: {
          title: 'IoT-Plan Sensor Data Graph',
          // author: 'john doe',
          // subject: 'subject of document',
          // keywords: 'keywords for document',
        },
        // pageSize: 'LEGAL',
        // pageOrientation: 'landscape',
        pageMargins: [40, 40, 40, 40],
        header: {
          text: '',
          width: 150,
          alignment: 'center',
        },
        footer: [
          {
            text: '',
            alignment: 'center',
            style: 'footerHeading'
          },
          {
            text: '',
            alignment: 'center',
            style: 'footertext'
          },
          {
            columns: [
              { text: '' },
              { text: 'Parents Signature', alignment: 'center', fontSize: 7 },
              { text: '' + '', alignment: 'center', fontSize: 7 },
              { text: 'Teacher Signature', alignment: 'center', fontSize: 7 },
              { text: '' }
            ]
          }

        ],

        content: [
          {
            image: contentDataURL,
            margin: [0, 40, 0, 0],
            width: 500
          },
        ],
        styles: {
          sectionHeader: {
            bold: true,
            decoration: 'underline',
            fontSize: 14,
            margin: [0, 15, 0, 15]
          },
          footerHeading: {
            bold: true,
            fontSize: 10,
          },
          footertext: {
            bold: true,
            fontSize: 7,
          }
        }
      };

      try {
        this.pdfMake = await this.initilizePDFMake();
        this.pdfMake.createPdf(documentDefinition).download('Result-Card.pdf');
      } catch (err) {
        alert(err);
      }

    });


  }
}
