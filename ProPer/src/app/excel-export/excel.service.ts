import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import { range } from 'rxjs';
import * as XLSX from 'xlsx';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable()
export class ExcelService {

constructor() { }

  public formatData(data:string[][]){
    let finalData: string[][] = data;
    let maxCellsNum=0;
    for (let row of data){
      if(row.length>maxCellsNum){
        maxCellsNum=row.length;
      }
    }
    let header: string[] = [];
    header.push("Name");
    for(let i=1; i<maxCellsNum; i+=2){
      header.push("Project Name");
      header.push("%");
    }
    finalData[0] = header;
    return(finalData);
  }

  public exportAsExcelFile(json: any[], excelFileName: string): void {

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json, {skipHeader: true});
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
  }
}