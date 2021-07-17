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
  parcelWaybillNumber?: string
  shopNameWaybill?: string
  shopIdWaybill?: string
  shopContactNumberWaybill?: string
  shopRegionWaybill?: string
  shopProvinceWaybill?: string
  shopMunicipalityWaybill?: string
  shopAddressLineWaybill?: string

  orderIdWaybill?: string
  buyerRegionWaybill?: string
  buyerProvinceWaybill?: string
  buyerMunicipalityWaybill?: string
  buyerBarangayWaybill?: string
  buyerAddressLineWaybill?: string
  buyerCompleteAddressLineWaybill?: string
  buyerNameWaybill?: string
  buyerContactNumber?: string
  

  productDescriptionWaybill?: string
  weightWaybill?: number
  productFeeWaybill?: number
  codFeeWaybill?: number
  insuranceFeeWaybill?: number
  shipmentFeeWaybill?: number

  constructor(private waybillService: WaybillService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    const shopValue = changes['shop']
    const vipValue = changes['vip']

    if(changes['vip'] != undefined){
      if(vipValue.currentValue != vipValue.previousValue){
        this.shopId = this.shop.shopId
        this.vipId = this.vip.vipId
        this.displayOrders()
        this.displayParcels()
        this.resetValues()
      }
    }

    if(changes['shop'] != undefined){
      if(shopValue.currentValue != shopValue.previousValue){
        this.shopId = this.shop.shopId
        this.vipId = this.vip.vipId
        this.displayOrders()
        this.displayParcels()
        this.resetValues()
      }
    }
  }

  displayParcels(){
    this.parcelObs$ = undefined
  }

  displayOrders(){
    this.orders$ = this.waybillService.getOrders(this.vipId, this.shopId)
  }

  
  getParcel(parcel: any){
    this.selectedParcel = parcel
    this.parcelWaybillNumber = this.selectedParcel.orderInformation.awb

    this.shopNameWaybill = this.shop.shopName
    this.shopIdWaybill = this.shop.shopId
    this.shopContactNumberWaybill = this.shop.shopContactNumber
    this.shopRegionWaybill = this.shop.shopAddress.shopRegion
    this.shopProvinceWaybill = this.shop.shopAddress.shopProvince
    this.shopMunicipalityWaybill = this.shop.shopAddress.shopMunicipality
    this.shopAddressLineWaybill = this.shopRegionWaybill + ", " + this.shopProvinceWaybill + ", " + this.shopMunicipalityWaybill

    this.orderIdWaybill = this.selectedItem.orderId

    this.buyerRegionWaybill = this.selectedParcel.customerAddress.region
    this.buyerProvinceWaybill = this.selectedParcel.customerAddress.province
    this.buyerMunicipalityWaybill = this.selectedParcel.customerAddress.municipality
    this.buyerBarangayWaybill = this.selectedParcel.customerAddress.barangay
    this.buyerAddressLineWaybill = this.selectedParcel.customerAddress.addressLine

    this.buyerNameWaybill = this.selectedParcel.customerInformation.customerName
    this.buyerContactNumber = this.selectedParcel.customerInformation.mobileNumber
    this.buyerCompleteAddressLineWaybill = this.selectedParcel.customerAddress.province + ", " + this.selectedParcel.customerAddress.municipality + ", " + this.selectedParcel.customerAddress.addressLine

    this.productDescriptionWaybill = this.selectedParcel.orderInformation.productDescription
    this.weightWaybill = this.selectedParcel.orderInformation.weight
    this.productFeeWaybill = this.selectedParcel.orderInformation.itemValue
    this.codFeeWaybill = this.selectedParcel.orderInformation.codFee
    this.insuranceFeeWaybill = this.selectedParcel.orderInformation.insuranceFee
    this.shipmentFeeWaybill = this.selectedParcel.orderInformation.shipmentFee

    this.waybillId = this.selectedParcel.id
    
    this.waybillService.getParcelDetails(this.vipId, this.shopId, this.parcelId, this.waybillId).subscribe(val => {
      this.waybillObs$ = val
    })
  }

  resetValues(){
    this.parcelWaybillNumber = undefined

    this.shopNameWaybill = undefined
    this.shopIdWaybill = undefined
    this.shopContactNumberWaybill = undefined
    this.shopRegionWaybill = undefined
    this.shopProvinceWaybill = undefined
    this.shopMunicipalityWaybill = undefined
    this.shopAddressLineWaybill = undefined

    this.orderIdWaybill = undefined

    this.buyerRegionWaybill = undefined
    this.buyerProvinceWaybill = undefined
    this.buyerMunicipalityWaybill = undefined
    this.buyerBarangayWaybill = undefined
    this.buyerAddressLineWaybill = undefined
    this.buyerNameWaybill = undefined
    this.buyerContactNumber = undefined

    this.productDescriptionWaybill = undefined
    this.weightWaybill = undefined
    this.productFeeWaybill = undefined
    this.codFeeWaybill = undefined
    this.insuranceFeeWaybill = undefined
    this.shipmentFeeWaybill = undefined
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
