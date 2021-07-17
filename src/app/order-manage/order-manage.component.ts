import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcel, WaybillService } from '../waybill.service';


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
  waybillObs$: any

  itemOrderId = 0
  @Input() public vip: any
  @Input() public shop: any
  selectedItem: any
  selectedParcel: any

  vipId!: string
  shopId!: string
  orderId!: string
  parcelId!: string
  waybillId!: string


  //waybill values
  parcelWaybillNumber = ""
  shopNameWaybill = ""
  shopContactNumberWaybill = ""
  shopAddressLineWaybill = ""

  buyerNameWaybill = ""
  buyerContactNumber = ""
  buyerAddressLineWaybill = ""

  productDescriptionWaybill = ""

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

  
  getParcel(parcel: any){
    this.selectedParcel = parcel
    this.parcelWaybillNumber = this.selectedParcel.orderInformation.awb

    this.shopNameWaybill = this.shop.shopName
    this.shopContactNumberWaybill = this.shop.shopContactNumber
    this.shopAddressLineWaybill = this.shop.shopAddress.shopRegion + ", " + this.shop.shopAddress.shopProvince + ", " + this.shop.shopAddress.shopMunicipality

    this.buyerNameWaybill = this.selectedParcel.customerInformation.customerName
    this.buyerContactNumber = this.selectedParcel.customerInformation.mobileNumber
    this.buyerAddressLineWaybill = this.selectedParcel.customerAddress.province + ", " + this.selectedParcel.customerAddress.municipality + ", " + this.selectedParcel.customerAddress.addressLine

    this.productDescriptionWaybill = this.selectedParcel.orderInformation.productDescription

    this.waybillId = this.selectedParcel.id
    
    this.waybillService.getParcelDetails(this.vipId, this.shopId, this.parcelId, this.waybillId).subscribe(val => {
      this.waybillObs$ = val
    })
    
  }

  details(item: any){
    this.selectedItem = item

    this.parcelId = this.selectedItem.id
    
    this.waybillService.getParcels(this.vipId, this.shopId, this.parcelId).subscribe(val => {
      this.parcelObs$ = val
    })

  }

  printWaybill(){
    console.log("hihi")
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
