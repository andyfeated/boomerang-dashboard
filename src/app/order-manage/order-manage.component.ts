import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  orders$ = this.waybillService.orders$
  parcelObs$: any
  parcel?: Parcel

  itemOrderId = 0
  @Input() public vip: any
  @Input() public shop: any
  selectedItem: any
  selectedParcel: any

  vipId!: string
  shopId!: string
  orderId!: string
  parcelId!: string



  constructor(private waybillService: WaybillService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    const shopValue = changes['shop']

    if(changes['shop'] != undefined){
      if(shopValue.currentValue != shopValue.previousValue){
        this.shopId = this.shop.shopId
        this.vipId = this.vip.vipId
        this.displayOrders()
      }
    }
  }

  displayOrders(){
    this.orders$ = this.waybillService.getOrders(this.vipId, this.shopId)
  }


  showVip(){
    console.log(this.vip.vipId)
    console.log(this.shop.shopId)
  }
  
  getParcel(parcel: any){
    this.selectedParcel = parcel
    console.log(this.selectedParcel)
  }

  details(item: any){
    this.selectedItem = item
    this.parcelId = this.selectedItem.id
    
    this.waybillService.getParcels(this.vipId, this.shopId, this.parcelId).subscribe(val => {
      this.parcelObs$ = val
    })

  }

  // toExcelFile(){
  //   let element = document.getElementById('customerss-parcel')
  //   const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(element)

  //   const wb: XLSX.WorkBook = XLSX.utils.book_new()
  //   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1')

  //   XLSX.writeFile(wb, this.fileName)
  //   alert("Done")
  // }
}
