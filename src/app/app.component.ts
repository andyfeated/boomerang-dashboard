import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vip, WaybillService } from './waybill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{



  //Boolean that is assigned to every component
  //If Boolean's value is true, it will be shown in main page

  isHome = false; //Home Page
  isOrders = true; //Create Waybill Page
  isWaybillBulk = false; //Create Waybills in Bulk Page
  isOrderManage = false; //Order Management Page 
  isManifesto = false 
  isFinanceSummary = false; //Finance Summary Page
  isFinancePayables = false; //Account Payables Page
  isFinanceReceivables = false; //Account Receivables Page
  isFinanceStatement = false; //Statement of Account Page
  isService = false; //Express Tracking Page
  isProblematicShipment = false; //Ticket Management Page
  isUser = false; //My Pickup Location Page
  isrecipientAddress = false; //My Recipient Address Page
  isAccount = false; //My User Account Page

  //String that is assigned to Icon's Class
  //If String's value is equal to "active", the icon's style will be highlighted

  homeActivate = ""; //Home Icon
  ordersActivate = "active"; //Orders Icon
  createWaybillActivate = "active";//Create Waybill Icon
  waybillBulkActivate = ""; //Create Waybills in Bulk Icon
  orderManageActivate = ""; //Order Management 
  financeActivate = "" //Finance Icon
  financeSummaryActivate = ""; //Finance Summary Icon
  financePayablesActivate = ""; //Account Payables Icon
  financeReceivablesActivate = ""; //Account Receivables Icon
  financeStatementActivate = ""; //Statement of Account Icon
  serviceActivate =""; //Service 
  expressTrackingActivate = ""; //Express Tracking Icon
  problematicShipmentActivate = ""; //Ticket Management Icon
  userActivate = ""; //Account Management 
  pickupAddressActivate = ""; //My Pickup Location Icon
  recipientAddressActivate = ""; //My Recipient Location Icon
  accountActivate = ""; //My User Accounts Icon
  manifestoActivate = ""

  vips$!: Observable<any>
  vip?: any
  vipId!: string

  shops$?: Observable<any>
  shop?: any
  shopId!: string

  shopRegion?: string

  orders$!: Observable<any>

  selectedValue: any
  selectedShop: any

  pageTitle = "Orders"

  userCredentials: any
  user: any
  userUid!: string

  sd = new Observable()
  loggedIn =false
  registerForm = false

  constructor(private waybill:WaybillService, private auth: AngularFireAuth){
    this.vips$ = this.waybill.vips$

  }

  ngOnInit(): void {
    if(localStorage.getItem('rows') !== null){
      this.loggedIn = true
    }else{
      this.loggedIn = false
    }
  }
  
  logout(){
    
    this.waybill.logoutAuth()
    this.loggedIn = false
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
    if(this.waybill.isLoggedIn){
      this.loggedIn = true
      this.user = this.waybill.user
    }
    alert("Successfully Logged In")
  }

  onChangeVip(){
    this.vip = this.selectedValue
    this.vipId = this.vip.vipId

    this.shops$ = this.waybill.getShops(this.vipId)
  }

  onChangeShop(){
    this.shop = this.selectedShop
    this.shopId = this.shop.shopId
    this.shopRegion = this.shop.shopAddress.shopRegion
    
    this.orders$ = this.waybill.getOrders(this.shopId, this.vipId)
  }
  
  //Displays Home Component and highlights its icon
  displayHome(){
    this.checkComponent();
    this.homeActivate ="active";
    this.isHome = true;
  }

  //Displays Create Waybill Page and Highlights its icon and the order's
  displayOrders(){
    this.checkComponent();
    this.ordersActivate = "active";
    this.isOrders = true;
    this.pageTitle = "Orders"
    this.createWaybillActivate = "active";
  }
  
  //Displays Create Waybills in Bulk Page and Highlights its icon and the order's
  displayWaybillBulk(){
    this.checkComponent();
    this.ordersActivate = "active"
    this.waybillBulkActivate = "active";
    this.isWaybillBulk = true;
  }

  //Displays Order Management Page and Highlights its icon and the order's
  displayOrderManage(){
    this.checkComponent();
    this.ordersActivate = "active";
    this.orderManageActivate = "active"
    this.isOrderManage = true;
  }
  
  //Displays Finance Summary Page and Highlights its icon and the Finance's
  displayFinanceSummary(){
    this.checkComponent();
    this.isFinanceSummary = true;
    this.financeActivate = "active";
    this.financeSummaryActivate = "active";
  }

  //Displays Account Payables Page and Highlights its icon and the Finance's
  displayFinancePayables(){
    this.checkComponent();
    this.isFinancePayables = true;
    this.financeActivate = "active"
    this.financePayablesActivate = "active";
  }

  //Displays Account Receivables Page and Highlights its icon and the Finance's
  displayFinanceReceivables(){
    this.checkComponent();
    this.isFinanceReceivables = true;
    this.financeActivate = "active";
    this.financeReceivablesActivate = "active";
  }

  //Displays Statement of Account Page and Highlights its icon and the Finance's
  displayFinanceStatement(){
    this.checkComponent();
    this.isFinanceStatement = true;
    this.financeActivate = "active"
    this.financeStatementActivate = "active";
  }

  //Displays Express Tracking Component and Highlights its icon and the Service's
  displayService(){
    this.checkComponent();
    this.serviceActivate = "active";
    this.expressTrackingActivate = "active";
    this.isService = true;
  }

  //Displays Ticket Management Component and Highlights its icon and the Service's
  displayProblematicShipment(){
    this.checkComponent();
    this.serviceActivate = "active";
    this.problematicShipmentActivate = "active";
    this.isProblematicShipment = true;
  }

  //Displays My Pickup Location Component and Highlights its icon and the Account Management's
  displayUser(){
    this.checkComponent();
    this.userActivate = "active";
    this.pickupAddressActivate = "active";
    this.isUser = true;
  }

  //Displays My Recipient Address Component and Highlights its icon and the Account Management's
  displayRecipientAddress(){
    this.checkComponent();
    this.userActivate = "active";
    this.recipientAddressActivate = "active";
    this.isrecipientAddress = true;
  }

  //Displays My User Account Component and Highlights its icon and the Account Management's
  displayAccount(){
    this.checkComponent();
    this.accountActivate = "active";
    this.isAccount = true;
  } 

  displayManifesto(){
    this.checkComponent();
    this.manifestoActivate ="active";
    this.isManifesto = true;
  }

  //Disables every boolean and string that is associated with the component
  checkComponent(){
    this.isOrders = false;
    this.isService = false;
    this.isFinanceSummary = false;
    this.isFinancePayables = false;
    this.isFinanceReceivables = false;
    this.isFinanceStatement = false;
    this.isUser = false;
    this.isHome = false;
    this.isAccount = false;
    this.isWaybillBulk = false;
    this.isOrderManage = false;
    this.isProblematicShipment = false;
    this.isrecipientAddress = false;
    this.isManifesto = false

    this.ordersActivate = "";
    this.financeActivate = "";
    this.financeSummaryActivate = "";
    this.financePayablesActivate = "";
    this.financeReceivablesActivate = "";
    this.financeStatementActivate = "";
    this.userActivate = "";
    this.serviceActivate = "";
    this.homeActivate ="";
    this.accountActivate = "";
    this.createWaybillActivate = "";
    this.waybillBulkActivate = "";
    this.orderManageActivate = "";
    this.expressTrackingActivate = "";
    this.problematicShipmentActivate = "";
    this.pickupAddressActivate = "";
    this.recipientAddressActivate = "";
    this.manifestoActivate = "";
  }

  displayRegisterForm(){
    this.registerForm =true
  }

  backToLogIn(){
    this.registerForm = false
  }
}

export interface Shop{
  shopAddress: {
    shopMunicipality:string,
    shopProvince :string
    shopRegion: string
 },
  shopContactNumber : string
  shopId:string
  shopName :string

}