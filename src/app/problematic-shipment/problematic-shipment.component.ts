import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-problematic-shipment',
  templateUrl: './problematic-shipment.component.html',
  styleUrls: ['./problematic-shipment.component.css']
})
export class ProblematicShipmentComponent implements OnInit {

  isTicketCustomer = true;
  isTicketOrder = false;
  isTicketCaptain = false;

  ticketCustomerActivate = "choices-active";
  ticketOrderActivate = "";
  ticketCaptainActivate = "";

  constructor() { }

  ngOnInit(): void {
  }

  displayTicketCustomer(){
    this.removeActive();
    this.isTicketCustomer = true;
    this.ticketCustomerActivate = "choices-active"
  }

  displayTicketOrder(){
    this.removeActive();
    this.isTicketOrder = true;
    this.ticketOrderActivate = "choices-active"
  }

  displayTicketCaptain(){
    this.removeActive();
    this.ticketCaptainActivate = "choices-active"
    this.isTicketCaptain = true;
  }

  removeActive(){
    this.isTicketCustomer = false;
    this.isTicketOrder = false;
    this.isTicketCaptain = false

    this.ticketOrderActivate = "";
    this.ticketCustomerActivate = "";
    this.ticketCaptainActivate = "";
  }

}
