import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-order-manage',
  templateUrl: './order-manage.component.html',
  styleUrls: ['./order-manage.component.css']
})
export class OrderManageComponent implements OnInit {

  parcelObs = this.waybillService.parcelObs

  constructor(private waybillService: WaybillService) { }

  ngOnInit(): void {
  }

}
