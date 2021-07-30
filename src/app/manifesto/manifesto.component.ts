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
  noFileImported = true

  importedData!: [][]
  waybillList: any = []

  excelFileTitle = "dashboard-data.xlsx"

  wayBillData = new Map<string, any>()
  captainIds = []
  captainNames = []
  captainMobileNumbers = []
  routeIds = []
  parcelStatuses = []

  constructor(private waybill:WaybillService) { }

  ngOnInit(): void {
    this.waybill.getWaybillList().subscribe(val => {
      this.dateList = val
      console.log(this.dateList.length)
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

  onUpload(eve: any){
    const target : DataTransfer = <DataTransfer>(eve.target)
    
    if(target.files.length != 1){
      throw new Error('Cannot use multiple files')
    }

    const reader : FileReader = new FileReader()

    reader.onload = (e: any) => {
      const bstr: string = e.target.result

      const wb: XLXS.WorkBook =XLXS.read(bstr, {type: 'binary'})
      const wsName: string = wb.SheetNames[0]
      const ws: XLXS.WorkSheet = wb.Sheets[wsName]

      this.importedData = (XLXS.utils.sheet_to_json(ws, {header: 1}))
    }
    reader.readAsBinaryString(target.files[0])
    this.noFileImported = false
  }

  importData(){
    this.importedData.splice(0,1)

    let j = 1
    let k = 27
    let l = 28
    let m = 29
    let n = 30
    let o = 8

    for(let i = 0; i < this.importedData.length; i++){
      this.captainIds[i] = this.importedData[i][k]
      this.captainNames[i] = this.importedData[i][l]
      this.captainMobileNumbers[i] = this.importedData[i][m]
      this.routeIds[i] = this.importedData[i][n]
      this.parcelStatuses[i] = this.importedData[i][o]

      this.wayBillData.set(this.importedData[i][j], this.importedData[i])
    }
    
    let keys = [...this.wayBillData.keys()]

    for(let i = 0; i < keys.length; i++){
      this.waybill.insertCaptainData(keys[i], this.captainNames[i], this.captainMobileNumbers[i], this.routeIds[i], this.parcelStatuses[i])
      console.log(keys.length)
      console.log(i)
    }
  }

}
