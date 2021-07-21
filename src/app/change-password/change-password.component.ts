import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(private waybill:WaybillService) { }

  ngOnInit(): void {
  }

  submitPassword(emailInput: string, oldPasswordInput: string, newPasswordInput: string){
    this.waybill.changePassword(emailInput, oldPasswordInput, newPasswordInput)
  }

}
