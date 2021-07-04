import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  parcelObs = this.waybillService.parcelObs

  parcels = [
    {customerName: "sample",
     awb: 0,
     mobileNumber: "sample",
     province: "sample",
     municipality: "sample",
     addressLine: "sample",
     barangay: "sample",
     productDescription: "sample",
     itemValueInt: 0,
     codFeeInt: 0,
     insuranceFeeInt: 0,
     weightInt: 0,

     codFee: "sample",
     weight: "sample",
     insuranceFee: "sample",
     shipmentFee: "sample",
     remarks:"sample",
     size: "sample",

     ordersId: 0
     
    }
     
  ]
  constructor(private waybillService: WaybillService) { }

  ngOnInit(): void {
    this.parcels = this.waybillService.returnParcel()
  }

}
