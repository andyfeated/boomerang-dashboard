import { Component, OnInit } from '@angular/core';
import { WaybillService } from '../waybill.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private waybill: WaybillService) { }

  userCredentials: any
  user: any
  userUid!: string
  

  ngOnInit(): void {
  }

  
  async register(email: string, password: string){
    await this.waybill.registerAuth(email, password)

    alert("Account Successfully Created")

    this.userCredentials = this.waybill.userCredentialsService
    this.userUid = this.userCredentials.user.uid

    await this.waybill.addToVip(this.userUid)
    alert("Added to Database")
  }

  async login(email: string, password: string){
    await this.waybill.loginAuth(email, password)

    this.user = this.waybill.user
    console.log(this.user)
    alert("Successfully Logged In")
  }

  
}
