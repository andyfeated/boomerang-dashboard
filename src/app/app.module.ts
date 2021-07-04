import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './orders/orders.component';
import { HomeComponent } from './home/home.component';
import { WaybillComponent } from './waybill/waybill.component';
import { ServiceComponent } from './service/service.component';
import { UserComponent } from './user/user.component';
import { AccountComponent } from './account/account.component';
import { WaybillBulkComponent } from './waybill-bulk/waybill-bulk.component';
import { OrderManageComponent } from './order-manage/order-manage.component';
import { ShippingFeeComponent } from './shipping-fee/shipping-fee.component';
import { ProblematicShipmentComponent } from './problematic-shipment/problematic-shipment.component';
import { RecipientAddressComponent } from './recipient-address/recipient-address.component';
import { FinanceSummaryComponent } from './finance-summary/finance-summary.component';
import { FinancePayablesComponent } from './finance-payables/finance-payables.component';
import { FinanceReceivablesComponent } from './finance-receivables/finance-receivables.component';
import { FinanceStatementComponent } from './finance-statement/finance-statement.component';
import { TicketCustomerComponent } from './ticket-customer/ticket-customer.component';
import { TicketOrderComponent } from './ticket-order/ticket-order.component';
import { TicketCaptainComponent } from './ticket-captain/ticket-captain.component';
import { WaybillService } from './waybill.service';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { environment } from 'src/environments/environment';
 
@NgModule({
  declarations: [
    AppComponent,
    OrdersComponent,
    HomeComponent,
    WaybillComponent,
    ServiceComponent,
    UserComponent,
    AccountComponent,
    WaybillBulkComponent,
    OrderManageComponent,
    ShippingFeeComponent,
    ProblematicShipmentComponent,
    RecipientAddressComponent,
    FinanceSummaryComponent,
    FinancePayablesComponent,
    FinanceReceivablesComponent,
    FinanceStatementComponent,
    TicketCustomerComponent,
    TicketOrderComponent,
    TicketCaptainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
  ],
  providers: [WaybillService],
  bootstrap: [AppComponent]
})
export class AppModule { }
