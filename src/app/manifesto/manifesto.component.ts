import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../waybill.service';
import * as XLXS from 'xlsx'

@Component({
  selector: 'app-manifesto',
  templateUrl: './manifesto.component.html',
  styleUrls: ['./manifesto.component.css']
})
export class ManifestoComponent implements OnInit {

  fromDateInput: any
  toDateInput: any
  dateList: any
  isInputNotComplete = true

  excelFileTitle = "dashboard-data.xlsx"

  constructor(private waybill:WaybillService) { }

  ngOnInit(): void {
    this.waybill.getWaybillList().subscribe(val => {
      this.dateList = val
    })
  }

  enableDownload(){
    this.isInputNotComplete = false
  }

  downloadSheet(){
    let fromDate = new Date(this.fromDateInput).getTime() / 1000
    let toDate = new Date(this.toDateInput).getTime() / 1000

    this.waybill.queryWaybillList(fromDate, toDate).subscribe(val => {
       this.dateList = val
    })
  }

  exportExcel(){
    let element = document.getElementById('customers2')
    const ws:XLXS.WorkSheet = XLXS.utils.table_to_sheet(element)

    const wb:XLXS.WorkBook = XLXS.utils.book_new()
    XLXS.utils.book_append_sheet(wb,ws, 'Sheet1')

    XLXS.writeFile(wb, this.excelFileTitle)
  }
}
