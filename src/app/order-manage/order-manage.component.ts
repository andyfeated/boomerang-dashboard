import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcel, WaybillService } from '../waybill.service';
import * as XLSX from 'xlsx'

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  orderObs$ = this.waybillService.orderObs$
  parcelObs$: any
  parcel?: Parcel

  itemOrderId = 0

  fileName = "dashboard-table.xlsx"

  constructor(private waybillService: WaybillService) { }

  ngOnInit(): void {
  }
  

  details(item: Parcel){
    this.parcel = item
    this.itemOrderId = this.parcel.orderId
    this.waybillService.getParcels(this.parcel.id).subscribe(val => {
      this.parcelObs$ = val
    })

  }

  toExcelFile(){
    let element = document.getElementById('customerss-parcel')
    const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element)

    const wb: XLSX.WorkBook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

    XLSX.writeFile(wb, this.fileName)
    alert("Done")
  }
}
