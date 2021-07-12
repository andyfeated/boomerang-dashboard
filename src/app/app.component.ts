import { Component, Input } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Vip, WaybillService } from './waybill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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

  homeActivate = "active"; //Home Icon
  ordersActivate = ""; //Orders Icon
  createWaybillActivate = "";//Create Waybill Icon
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

  vips$!: Observable<Vip[]>
  vipId!: string

  shops$?: Observable<any>
  shopId!: string

  orders$!: Observable<any>

  constructor(private waybill:WaybillService){
    this.vips$ = this.waybill.vips$
    
  }

  onChangeVip(event: any){
    this.vipId = event.target.value

    this.shops$ = this.waybill.getShops(this.vipId)
  }

  onChangeShop(event: any){
    this.shopId = event.target.value
    
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
}
