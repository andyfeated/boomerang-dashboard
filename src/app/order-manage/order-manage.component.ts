import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Parcel, WaybillService } from '../waybill.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  parcelObs = this.waybillService.parcelObs
  parcel?: Parcel

  constructor(private waybillService: WaybillService) { }

  ngOnInit(): void {
  }
  

  details(item: Parcel){
    this.parcel = item
  }

  deleteDoc(item: Parcel){
    this.waybillService.delete(item.id)
  }
}
