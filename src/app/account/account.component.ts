import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateShopComponent } from '../create-shop/create-shop.component';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {

  @Input() public newVip: any
  vip: any
  vipId!: string

  shops$: any
  shopSize: any
  shopId!: string

  dialogRef: any

  constructor(private waybill:WaybillService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.waybill.getAuthState().subscribe(val => {
      let vip = val
      this.vipId = val!.email!.toString()

      this.waybill.getCurrentUser(vip!.email!).subscribe(vipUser => {
        this.vip = vipUser        
        this.waybill.getShops(vip!.email!).subscribe(shops => {
          this.shops$ = shops
          this.shopSize = this.shops$.length
          this.shopId = this.vip.shopPrefix + "-" + (this.vip.shopPostfix + this.shopSize)
        })
      })
    })
  }

  openShopDialog(){
    this.dialogRef = this.dialog.open(CreateShopComponent, {
      width: '400px',
      height: '500px',
      data: {
        dataKey: {
          vipId: this.vipId,
          shopId: this.shopId
        }
      }
    })
  }

}
