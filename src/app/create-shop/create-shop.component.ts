import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-create-shop',
  templateUrl: './create-shop.component.html',
  styleUrls: ['./create-shop.component.css']
})
export class CreateShopComponent implements OnInit {
     
  vipId!: any
  shopId!: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private waybill:WaybillService) { }

  ngOnInit(): void {
    this.vipId = this.data.dataKey.vipId
    this.shopId = this.data.dataKey.shopId
    console.log(this.vipId, this.shopId)
  }

  createNewShop(shopName: string, shopContactNumber: string, shopRegion: string, shopProvince: string, shopMunicipality: string){
    this.waybill.addShop(this.vipId, this.shopId, shopName, shopContactNumber, shopRegion, shopProvince, shopMunicipality)
    console.log(shopName, shopContactNumber, shopRegion, shopProvince, shopMunicipality)
  }

}
