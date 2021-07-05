import { Injectable } from '@angular/core';
import { ExportToCsv } from 'export-to-csv';
@Injectable({
  providedIn: 'root'
})
export class CsvExportService {

  constructor() { }

  exportCSV(data, name) {
    const options = {
      fieldSeparator: ',',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: true,
      showTitle: false,
      filename: name,
      useTextFile: false,
      useBom: true,
      useKeysAsHeaders: true,
      // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
    };

    const csvExporter = new ExportToCsv(options);

    csvExporter.generateCsv(data);
  }
}
